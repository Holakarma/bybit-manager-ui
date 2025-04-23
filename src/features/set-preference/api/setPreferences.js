import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
// eslint-disable-next-line no-restricted-imports
import { useLoginAccountMutation } from 'features/login/api/loginAccount';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import { getExpireFromAllCookies } from 'shared/lib/session-cookies';

const setPreferences = (database_id, signal) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.set_preferences,
		{ deposit_to: 'uta' },
		{
			signal,
			params: { database_id },
		},
	);
};

export const useSetPreferencesAccountMutation = () => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['set-preferences', database_id],
			requestFn: async () => {
				const result = await setPreferences(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['set-preferences'],
	});
};

const useSetPreferencesTask = () => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Seting preferences...');
	};
	const mutation = useSetPreferencesAccountMutation();
	const loginMutation = useLoginAccountMutation();
	const accountMutation = useAccount();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({
		database_id,
		signal,
		taskId,
		settings,
	}) => {
		const account = await accountMutation.mutateAsync(database_id);
		const expire = getExpireFromAllCookies(account.cookies);

		/* If account is not logged in */
		if (!expire || expire * 1000 < Date.now()) {
			if (settings.prelogin) {
				try {
					addInfoLog({
						message:
							'Cookies was not found or expired, try to prelogin account',
						group: taskId,
						database_id,
					});

					await loginMutation.mutateAsync({
						database_id,
						taskId,
						signal,
					});
				} catch (error) {
					addErrorLog({ error, group: taskId, database_id });
					return;
				}
			} else {
				addErrorLog({
					error: new Error('Account is not logged in, skip'),
					group: taskId,
					database_id,
				});
				return;
			}
		}

		addInfoLog({
			message: 'Setting preferences',
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
			message: 'Preferences set',
			group: taskId,
			database_id,
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'set_preferences',
	});
};

export default useSetPreferencesTask;
