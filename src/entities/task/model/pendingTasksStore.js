import { uniqueId } from 'shared/lib/generateUniqueId';
import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

export const createPendingTask = ({ type, ...properties }) => ({
	id: uniqueId(),
	type: type || 'default',
	startedAt: Date.now(),
	...properties,
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
	processAccount: (taskId, { accountId, data, error }) =>
		set((state) => {
			return {
				tasks: state.tasks.map((task) => {
					if (task.id === taskId) {
						return {
							...task,
							accounts: {
								...task.accounts,
								// toProcess: [
								// 	...task.accounts.toProcess.filter(
								// 		(id) => id !== accountId,
								// 	),
								// ],
								processed: [
									...task.accounts.processed,
									{ id: accountId, data, error },
								],
							},
						};
					}
					return task;
				}),
			};
		}),
}));

const usePendingTasks = createSelectors(usePendingTasksBase);
export default usePendingTasks;
