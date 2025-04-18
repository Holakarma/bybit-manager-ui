import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
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
	const accountMutation = useAccount();

	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['logout', database_id],
			requestFn: async () => {
				const account = await accountMutation.mutateAsync(database_id);

				const expire = getExpireFromAllCookies(account.cookies);

				/* If account is not logged in */
				if (!expire || expire * 1000 < Date.now()) {
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
	});
};

const useLogoutTask = () => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Logging out...');
	};
	const mutation = useLogoutAccountMutation();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({ database_id, signal, taskId }) => {
		addInfoLog({
			message: 'logging out',
			group: taskId,
			database_id,
		});

		try {
			await mutation.mutateAsync({ database_id, signal });
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'logged out',
			group: taskId,
			database_id,
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'logout',
	});
};

export default useLogoutTask;
