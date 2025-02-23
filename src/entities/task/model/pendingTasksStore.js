import { uniqueId } from 'shared/lib/generateUniqueId';
import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

export const createPendingTask = ({ data, type, abort }) => ({
	id: uniqueId(),
	data,
	type: type || 'default',
	startedAt: Date.now(),
	abort,
});

const usePendingTasksBase = create((set) => ({
	tasks: [],

	addTask: (newTask) =>
		set((state) => {
			return {
				tasks: [newTask, ...state.tasks],
			};
		}),
	deleteTask: (id) =>
		set((state) => {
			return {
				tasks: state.tasks.filter((task) => task.id !== id),
			};
		}),
}));

const usePendingTasks = createSelectors(usePendingTasksBase);
export default usePendingTasks;
