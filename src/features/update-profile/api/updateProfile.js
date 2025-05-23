import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUpdateProfile } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
// eslint-disable-next-line no-restricted-imports
import { usePreloginAttempt } from 'features/login/@X/pre-login';
import { useSnackbar } from 'notistack';

export const useUpdateProfileMutation = () => {
	const updateProfileApi = useUpdateProfile();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const preloginAttempMutation = usePreloginAttempt();

	const mutationFn = async ({ database_id, signal, taskId, settings }) => {
		try {
			await preloginAttempMutation.mutateAsync({
				database_id,
				signal,
				taskId,
				settings,
			});
		} catch (error) {
			console.log('here');
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			message: 'updating profile',
			group: taskId,
			database_id,
		});

		let result;

		try {
			result = await updateProfileApi.mutateAsync({
				database_id,
				signal,
				settings,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'profile updated',
			group: taskId,
			database_id,
		});

		return result;
	};

	return useMutation({
		mutationFn,
		mutationKey: ['update profile'],
	});
};

const useUpdateProfileTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
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

	const mutation = useUpdateProfileMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		onAccountProcessed: processedAccountHandler,
		type: 'update',
	});
};

export default useUpdateProfileTask;
