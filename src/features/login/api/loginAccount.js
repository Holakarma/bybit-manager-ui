import { useMutation } from '@tanstack/react-query';
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
		mutationFn: (database_id) => loginAccount(database_id),
		mutationKey: ['login'],
	});

const useLoginTask = () => {
	const mutation = useLoginAccountMutation();
	const addTask = usePendingTasks.use.addTask();
	const deleteTask = usePendingTasks.use.deleteTask();

	let data = null;
	const mutate = (database_ids) => {
		const task = createPendingTask(database_ids);
		addTask(task);
		Promise.allSettled(
			database_ids.map((id) => mutation.mutateAsync(id)),
		).then((result) => {
			data = result;
			// deleteTask(task.id);
		});
	};

	return { data, mutate };
};

export default useLoginTask;
