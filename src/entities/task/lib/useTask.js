import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { processChunks } from 'shared/api';
import usePendingTasks, { createPendingTask } from '../model/pendingTasksStore';
import taskTitle from '../model/taskTitles';
import useSaveTask from './saveTask';

/**
 * @typedef {Object} Settings
 * @property {boolean} shuffle
 * @property {Object} delay
 * @property {number} delay.min
 * @property {number} delay.max
 * @property {number} threads
 *
 */

const useTask = ({
	asyncMutation,
	onSuccess: onInitSuccess,
	onError: onInitError,
	onSettled: onInitSetteled,
	onAccountProcessed,
	onAccountMutation,
	type,
}) => {
	const deleteTask = usePendingTasks.use.deleteTask();
	const addTask = usePendingTasks.use.addTask();
	const processAccount = usePendingTasks.use.processAccount();

	const { enqueueSnackbar } = useSnackbar();
	const queryClient = useQueryClient();
	const saveTaskMutation = useSaveTask();

	let data = null;
	let abortController = null;

	const mutate = async ({
		database_ids,
		settings,
		onSuccess,
		onSettled,
		onError,
	}) => {
		abortController = new AbortController();

		const idsToProcess = settings.shuffle
			? [...database_ids].sort(() => Math.random() - 0.5)
			: database_ids;

		const task = createPendingTask({
			data: idsToProcess,
			accounts: {
				toProcess: idsToProcess.map((id) => ({
					id,
					description: 'Waiting',
				})),
				processed: [],
			},
			type,
			settings,
			abort: () => abortController.abort(),
		});
		addTask(task);

		try {
			data = await processChunks({
				idsToProcess,
				settings,
				asyncMutation,
				signal: abortController.signal,
				onAccountMutation: onAccountMutation,
				onAccountProcessed: ({ database_id, data, error, taskId }) => {
					if (onAccountProcessed) {
						onAccountProcessed({
							database_id,
							data,
							error,
							taskId,
						});
					}
					processAccount(task.id, {
						accountId: database_id,
						data,
						error,
					});
				},
				taskId: task.id,
			});
			if (onSuccess) {
				onSuccess({ data, task });
			}
			if (onInitSuccess) {
				onInitSuccess({ data, task });
			}
			queryClient.invalidateQueries({
				queryKey: ['accounts'],
			});
			enqueueSnackbar(`${taskTitle[task.type]} completed`, {
				variant: 'info',
			});
			await saveTaskMutation.mutateAsync(task);
		} catch (error) {
			if (onError) {
				onError(error);
			}
			if (onInitError) {
				onInitError(error);
			}
			enqueueSnackbar(`${taskTitle[task.type]} aborted`, {
				variant: 'warning',
			});
		} finally {
			if (onSettled) {
				onSettled({ data, task });
			}
			if (onInitSetteled) {
				onInitSetteled({ data, task });
			}

			deleteTask(task.id);
		}
	};

	const abort = () => {
		if (abortController) {
			abortController.abort();
		}
	};

	return { data, mutate, abort };
};

export default useTask;
