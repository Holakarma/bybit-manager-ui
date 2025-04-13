import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountsById, useGetAccounts } from 'entities/account';
import { taskDB, usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const enable2fa = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.enable_2fa, null, {
		signal,
		params: { database_id },
	});
};

export const useEnable2faMutation = () => {
	const accounts = useGetAccounts();

	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['enable2fa', database_id],
			requestFn: async () => {
				const account = getAccountsById(accounts.data, [
					database_id,
				])[0];

				/* If account has totp enabled */
				if (account.totp_enabled) {
					return { result: null, database_id };
				}

				const result = await enable2fa(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['enable2fa'],
		enabled: accounts.isSuccess,
	});
};

const useEnable2faTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'enable2fa',
			status: 'completed',
			data: accounts,
			startedAt: task.startedAt,
			id: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('2fa enabled', {
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
		changeAccountDescription(taskId, id, 'Enabling 2fa...');
	};
	const mutation = useEnable2faMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'enable2fa',
	});
};

export default useEnable2faTask;
