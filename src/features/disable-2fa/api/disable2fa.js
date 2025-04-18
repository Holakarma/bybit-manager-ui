import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const disable2fa = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.disable_2fa, null, {
		signal,
		params: { database_id },
	});
};

export const useDisable2faMutation = () => {
	const accountMutation = useAccount();

	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['disable2fa', database_id],
			requestFn: async () => {
				const account = await accountMutation.mutateAsync(database_id);

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
	});
};

const useDisable2faTask = () => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const successHandler = async () => {
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
	};

	// @TODO: account description is unused now
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Disabling 2fa...');
	};
	const mutation = useDisable2faMutation();
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
		onSuccess: successHandler,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'disable2fa',
	});
};

export default useDisable2faTask;
