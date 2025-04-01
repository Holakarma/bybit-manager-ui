import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountsById, useGetAccountsQuery } from 'entities/account';
import { taskDB, usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const disable2fa = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.disable_2fa, null, {
		signal,
		params: { database_id },
	});
};

export const useDisable2faMutation = () => {
	const accounts = useGetAccountsQuery();

	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['disable2fa', database_id],
			requestFn: async () => {
				const account = getAccountsById(accounts.data, [
					database_id,
				])[0];

				/* If account has totp disabled */
				if (!account.totp_enabled) {
					return { result: null, database_id };
				}

				const result = await disable2fa(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['disable2fa'],
		enabled: accounts.isSuccess,
	});
};

const useDisable2faTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'disable2fa',
			status: 'completed',
			data: accounts,
			startedAt: task.startedAt,
			taskId: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('2fa disabled', {
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
		changeAccountDescription(taskId, id, 'Disabling 2fa...');
	};
	const mutation = useDisable2faMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'disable2fa',
	});
};

export default useDisable2faTask;
