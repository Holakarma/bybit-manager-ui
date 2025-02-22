import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPendingTask, usePendingTasks } from 'entities/task';
import { Api, ENDPOINTS } from 'shared/api';

const loginAccount = (database_id) => {
	const api = new Api();

	const url = ENDPOINTS.login_account;

	return api.Post({
		url,
		query: {
			database_id,
		},
	});
};

const useLoginAccountMutation = () =>
	useMutation({
		mutationFn: async (database_id) => ({
			data: await loginAccount(database_id),
			database_id,
		}),
		mutationKey: ['login'],
	});

const useLoginTask = () => {
	const queryClient = useQueryClient();
	const deleteTask = usePendingTasks.use.deleteTask();
	const mutation = useLoginAccountMutation();
	const addTask = usePendingTasks.use.addTask();
	let data = null;

	const mutate = async ({ database_ids, settings, onSettled }) => {
		const idsToProcess = settings.shuffle
			? [...database_ids].sort(() => Math.random() - 0.5)
			: database_ids;

		const task = createPendingTask({
			data: idsToProcess,
			type: 'login',
		});
		addTask(task);

		const getRandomDelay = () => {
			const min = settings.delay.min * 1000; // конвертируем в миллисекунды
			const max = settings.delay.max * 1000;
			return Math.floor(Math.random() * (max - min + 1) + min);
		};

		data = await processChunks({
			idsToProcess,
			threads: settings.threads,
			asyncMutatuionFn: mutation.mutateAsync,
			getRandomDelay,
		});
		if (onSettled) {
			onSettled({ data, taskId: task.id });
		}
		deleteTask(task.id);
		queryClient.invalidateQueries({ queryKey: ['accounts'] });
	};

	return { data, mutate };
};

const processChunks = ({
	idsToProcess,
	threads,
	asyncMutatuionFn,
	getRandomDelay,
}) => {
	let data = [];
	let i = 0;

	return new Promise((resolve) => {
		function processNextChunk() {
			if (i >= idsToProcess.length) {
				resolve(data);
				return;
			}

			const chunk = idsToProcess.slice(i, i + threads);

			Promise.allSettled(
				chunk.map((id) =>
					asyncMutatuionFn(id)
						.then(() => ({ id }))
						.catch((error) => {
							throw Error(
								JSON.stringify({
									id,
									error: error.data,
								}),
							);
						}),
				),
			).then((results) => {
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
