import { Database, TASKS_STORE } from 'shared/api';

class TaskDatabase extends Database {
	async addTask(task) {
		return await this.addRow(TASKS_STORE, task);
	}

	async getTasks(filter) {
		return await this.getRows(TASKS_STORE, filter);
	}

	async clearTasks() {
		return await this.clearRows(TASKS_STORE);
	}

	async deleteTask(taskId) {
		return await this.deleteRow(TASKS_STORE, taskId);
	}
}

export const taskDB = new TaskDatabase();
