import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskDB, usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const registerAccount = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.register_account, null, {
		signal,
		params: { database_id },
	});
};

export const useRegisterAccountMutation = () => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['register', database_id],
			requestFn: async () => {
				const result = await registerAccount(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['register'],
	});
};

const useRegisterTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'register',
			status: 'completed',
			data: accounts,
			startedAt: task.startedAt,
			id: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('register completed', {
			variant: 'info',
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

	const processedAccountHandler = ({ id, error }) => {
		if (error) {
			enqueueSnackbar(
				`${id} ${
					error.bybit_response?.ret_msg ||
					error.statusText ||
					'Some error occured'
				}`,
				{
					variant: 'error',
				},
			);
		}
	};

	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Signing up...');
	};

	const mutation = useRegisterAccountMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountProcessed: processedAccountHandler,
		onAccountMutation: accountMutationHandler,
		type: 'register',
	});
};

export default useRegisterTask;
