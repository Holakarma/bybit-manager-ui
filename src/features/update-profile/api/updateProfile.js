import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
// eslint-disable-next-line no-restricted-imports
import { useLoginAccountMutation } from 'features/login/@X/pre-login';

const updateProfile = (database_id, signal) => {
	const api = new Api();
	return api.Get(ENDPOINTS.update_profile, {
		signal,
		params: { database_id },
	});
};

export const useUpdateProfileMutation = (props) => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['update', database_id],
			requestFn: async () => {
				const result = await updateProfile(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['update'],
		...props,
	});
};

const useUpdateProfileTask = ({ onPrelogin, onPreloginError } = {}) => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const loginMutation = useLoginAccountMutation();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
	};

	const processedAccountHandler = ({ database_id, error, taskId }) => {
		changeAccountDescription(taskId, database_id, 'Updating account...');

		if (error) {
			enqueueSnackbar(
				`${database_id} ${
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
		changeAccountDescription(taskId, id, 'Updating profile...');
	};

	const mutation = useUpdateProfileMutation({
		onMutate: (variables) => {
			return new Promise((resolve, reject) => {
				if (variables.settings.prelogin) {
					changeAccountDescription(
						variables.taskId,
						variables.database_id,
						'Logging in...',
					);

					loginMutation
						.mutateAsync(variables)
						.then((result) => {
							if (onPrelogin) {
								onPrelogin(result);
							}
							resolve(result);
						})
						.catch((error) => {
							if (onPreloginError) {
								onPreloginError(error);
							}
							reject(error);
						});
				} else {
					resolve();
				}
			});
		},
	});
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({
		database_id,
		signal,
		taskId,
		settings,
	}) => {
		addInfoLog({
			message: 'updating profile',
			group: taskId,
			database_id,
		});

		try {
			await mutation.mutateAsync({ database_id, signal, settings });
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'profile updated',
			group: taskId,
			database_id,
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		onAccountProcessed: processedAccountHandler,
		type: 'update',
	});
};

export default useUpdateProfileTask;
