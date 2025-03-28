import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskDB, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const loginAccount = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.login_account, null, {
		signal,
		params: { database_id },
	});
};

export const useLoginAccountMutation = () => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['login', database_id],
			requestFn: async () => {
				const result = await loginAccount(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['login'],
	});
};

const useLoginTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const successHandler = async ({ data: accounts, taskId }) => {
		await taskDB.addTask({
			type: 'login',
			status: 'completed',
			data: accounts,
			taskId,
			startedAt: Date.now(),
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('Login completed', {
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

	const mutation = useLoginAccountMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		type: 'login',
	});
};

export default useLoginTask;
