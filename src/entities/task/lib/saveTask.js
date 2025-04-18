import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLogs } from 'entities/log';
import { taskDB } from '../api/db';

const useSaveTask = () => {
	const logs = useLogs.use.logs();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (task) => {
			await taskDB.addTask({
				type: task.type,
				logs: logs[task.id],
				startedAt: task.startedAt,
				id: task.id,
			});
			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});
		},
		mutationKey: ['save task'],
	});
};

export default useSaveTask;
