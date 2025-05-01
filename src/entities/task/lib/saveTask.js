import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLogs } from 'entities/log';
import { taskDB } from '../api/db';

const useSaveTask = () => {
	const getLogsByGroup = useLogs.use.getLogsByGroup();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (task) => {
			await taskDB.addTask({
				type: task.type,
				logs: getLogsByGroup(task.id) || [],
				startedAt: task.startedAt,
				id: task.id,
			});
			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});

			return;
		},
		mutationKey: ['save task'],
	});
};

export default useSaveTask;
