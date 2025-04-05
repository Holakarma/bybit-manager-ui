import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomRequests } from 'entities/custom-request';
import { taskDB, usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const customRequest = (database_id, signal, request) => {
	console.log('request', request);
	const api = new Api();
	return api.Post(ENDPOINTS.custom_request, request, {
		signal,
		params: { database_id },
	});
};

export const useCustomRequestMutation = (request) => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['custom request', database_id],
			requestFn: async () => {
				const result = await customRequest(
					database_id,
					signal,
					request,
				);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['custom request'],
	});
};

const useCustomRequestTask = (requestId) => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const requests = useCustomRequests();
	const request = requests.data?.find((r) => r.id === requestId);

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'custom request',
			status: 'completed',
			data: { accounts, request },
			startedAt: task.startedAt,
			id: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('custom request completed', {
			variant: 'info',
		});

		/* Error accounts handling */
		accounts.forEach((account) => {
			if (account.error) {
				enqueueSnackbar(
					`${account.id} ${
						account?.error?.bybit_response?.ret_msg ||
						'Some error occured'
					}`,
					{
						variant: 'error',
					},
				);
			}
		});
	};

	const errorHandler = (error) => {
		if (error.message === 'Aborted') {
			enqueueSnackbar('Task aborted', {
				variant: 'warning',
			});
		} else {
			enqueueSnackbar('Error occured: ' + error.message, {
				variant: 'error',
			});
		}
	};

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Processing...');
	};
	const mutation = useCustomRequestMutation(request);

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'custom request',
	});
};

export default useCustomRequestTask;
