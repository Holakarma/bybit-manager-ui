import { processChunks } from 'shared/api';
import usePendingTasks, { createPendingTask } from '../model/pendingTasksStore';

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
	type,
}) => {
	const deleteTask = usePendingTasks.use.deleteTask();
	const addTask = usePendingTasks.use.addTask();
	const processAccount = usePendingTasks.use.processAccount();

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
				toProcess: idsToProcess,
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
				onAccountProccessed: (id, data, error) => {
					processAccount(task.id, { accountId: id, data, error });
				},
			});
			if (onSuccess) {
				onSuccess({ data, taskId: task.id });
			}
			if (onInitSuccess) {
				onInitSuccess({ data, taskId: task.id });
			}
		} catch (error) {
			if (onError) {
				onError(error);
			}
			if (onInitError) {
				onInitError(error);
			}
		} finally {
			if (onSettled) {
				onSettled({ data, taskId: task.id });
			}
			if (onInitSetteled) {
				onInitSetteled({ data, taskId: task.id });
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
