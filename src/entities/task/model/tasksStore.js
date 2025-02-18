import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useTasksBase = create((set) => ({
	tasks: [
		{
			id: '1',
			title: 'IMAP Scanner',
			status: 'pending',
		},
		{
			id: '2',
			title: 'KYC Links',
			status: 'success',
		},
		{
			id: '3',
			title: 'KYC Links',
			status: 'error',
		},
	],
	addTask: (newTask) =>
		set((state) => {
			return {
				tasks: [...state.tasks, newTask],
			};
		}),
}));

const useTasks = createSelectors(useTasksBase);
export default useTasks;
