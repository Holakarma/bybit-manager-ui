import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPendingTask, usePendingTasks } from 'entities/task';
import { Api, ENDPOINTS } from 'shared/api';

const loginAccount = (database_id, signal) => {
	const api = new Api();
	return api.Post(ENDPOINTS.login_account, null, {
		signal,
		params: { database_id },
	});
};

const activeRequests = new Map();

const useLoginAccountMutation = () =>
	useMutation({
		mutationFn: async ({ database_id, signal }) => {
			// @TODO: create lib function for deduplicate reauests
			if (activeRequests.has(database_id)) {
				return activeRequests.get(database_id);
			}

			const promise = loginAccount(database_id, signal)
				.then((response) => {
					activeRequests.delete(database_id);
					return { response, database_id };
				})
				.catch((error) => {
					activeRequests.delete(database_id);
					throw error;
				});

			activeRequests.set(database_id, promise);
			return promise;
		},
		mutationKey: ['login'],
	});

const useLoginTask = () => {
	const queryClient = useQueryClient();
	const deleteTask = usePendingTasks.use.deleteTask();
	const mutation = useLoginAccountMutation();
	const addTask = usePendingTasks.use.addTask();
	let data = null;
	let abortController = null;

	const mutate = async ({ database_ids, settings, onSuccess, onAbort }) => {
		abortController = new AbortController();

		const idsToProcess = settings.shuffle
			? [...database_ids].sort(() => Math.random() - 0.5)
			: database_ids;

		const task = createPendingTask({
			data: idsToProcess,
			type: 'login',
			abort: () => abortController.abort(),
		});
		addTask(task);

		const getRandomDelay = () => {
			const min = settings.delay.min * 1000;
			const max = settings.delay.max * 1000;
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		try {
			data = await processChunks({
				idsToProcess,
				threads: settings.threads,
				asyncMutatuionFn: mutation.mutateAsync,
				getRandomDelay,
				signal: abortController.signal,
			});
			if (onSuccess) {
				onSuccess({ data, taskId: task.id });
			}
		} catch (error) {
			if (error.name === 'AbortError') {
				if (onAbort) onAbort({ taskId: task.id });
			} else {
				throw error;
			}
		} finally {
			deleteTask(task.id);
			queryClient.invalidateQueries({ queryKey: ['accounts'] });
		}
	};

	const abort = () => {
		if (abortController) {
			abortController.abort();
		}
	};

	return { data, mutate, abort };
};

const processChunks = ({
	idsToProcess,
	threads,
	asyncMutatuionFn,
	getRandomDelay,
	signal,
}) => {
	let data = [];
	let i = 0;

	return new Promise((resolve, reject) => {
		// Проверяем не отменена ли операция
		if (signal.aborted) {
			reject(new DOMException('Aborted', 'AbortError'));
			return;
		}

		// Добавляем слушатель для отмены
		signal.addEventListener('abort', () => {
			reject(new DOMException('Aborted', 'AbortError'));
		});

		function processNextChunk() {
			if (signal.aborted) {
				reject(new DOMException('Aborted', 'AbortError'));
				return;
			}

			if (i >= idsToProcess.length) {
				resolve(data);
				return;
			}

			const chunk = idsToProcess.slice(i, i + threads);

			Promise.allSettled(
				chunk.map((id) =>
					asyncMutatuionFn({ database_id: id, signal })
						.then(() => ({ id }))
						.catch((error) => {
							throw Error(
								JSON.stringify({
									id,
									error: error?.data || 'Aborted by user',
								}),
							);
						}),
				),
			).then((results) => {
				if (signal.aborted) {
					reject(new DOMException('Aborted', 'AbortError'));
					return;
				}

				data.push(
					...results.map((result) => {
						return result.status === 'fulfilled'
							? {
									status: 'success',
									...result.value,
									error: null,
								}
							: {
									status: 'error',
									...JSON.parse(result.reason.message),
								};
					}),
				);

				i += threads;

				if (i < idsToProcess.length) {
					new Promise((resolve) =>
						setTimeout(resolve, getRandomDelay()),
					).then(() => processNextChunk());
				} else {
					resolve(data);
				}
			});
		}

		processNextChunk();
	});
};

export default useLoginTask;
