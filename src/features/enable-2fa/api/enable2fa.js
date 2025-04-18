import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const enable2fa = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.enable_2fa, null, {
		signal,
		params: { database_id },
	});
};

export const useEnable2faMutation = () => {
	const accountMutatuin = useAccount();

	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['enable2fa', database_id],
			requestFn: async () => {
				const account = await accountMutatuin.mutateAsync(database_id);

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
	});
};

const useEnable2faTask = () => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();
	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
	};
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Enabling 2fa...');
	};
	const mutation = useEnable2faMutation();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({ database_id, signal, taskId }) => {
		addInfoLog({
			message: 'disabling 2fa',
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
			message: '2fa disabled',
			group: taskId,
			database_id,
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'enable2fa',
	});
};

export default useEnable2faTask;
