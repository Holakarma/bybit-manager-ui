import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAccountsById, useGetAccountsQuery } from 'entities/account';
import { taskDB, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import { getExpireFromAllCookies } from 'shared/lib/session-cookies';

const logoutAccount = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.logout_account, null, {
		signal,
		params: { database_id },
	});
};

export const useLogoutAccountMutation = () => {
	const accounts = useGetAccountsQuery();

	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['logout', database_id],
			requestFn: async () => {
				const account = getAccountsById(accounts.data, [
					database_id,
				])[0];
				const expire = getExpireFromAllCookies(account.cookies);

				/* If account is not logged in */
				if (!expire || expire < Date.now()) {
					return { result: null, database_id };
				}

				const result = await logoutAccount(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['logout'],
		enabled: accounts.isSuccess,
	});
};

const useLogoutTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'logout',
			status: 'completed',
			data: accounts,
			startedAt: task.startedAt,
			taskId: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('logout completed', {
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

	const mutation = useLogoutAccountMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		type: 'logout',
	});
};

export default useLogoutTask;
