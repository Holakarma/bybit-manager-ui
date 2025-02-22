import { useQuery } from '@tanstack/react-query';
import { taskDB } from './db';

const useGetTasks = () =>
	useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskDB.getTasks(),
	});

export default useGetTasks;
