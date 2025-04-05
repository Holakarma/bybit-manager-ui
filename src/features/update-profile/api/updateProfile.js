import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskDB, usePendingTasks, useTask } from 'entities/task';
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

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'update',
			status: 'completed',
			data: accounts,
			startedAt: task.startedAt,
			id: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('Update completed', {
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

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		onAccountProcessed: processedAccountHandler,
		type: 'update',
	});
};

export default useUpdateProfileTask;
