import { DB_NAME, DB_VERSION, schema, TASKS_STORE } from '../model/schema';

class TaskDatabase {
	constructor() {
		this.db = null;
	}

	init() {
		if (this.db) return;

		return new Promise((resolve, reject) => {
			const request = indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => {
				this.db = request.result;
				this.db.onversionchange = function () {
					this.db.close();
					alert('Database version is deprecated, refresh the page.');
				};
				resolve(this.db);
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;

				if (!db.objectStoreNames.contains(TASKS_STORE)) {
					const store = db.createObjectStore(TASKS_STORE, {
						keyPath: 'id',
						autoIncrement: true,
					});

					schema.stores[0].indexes.forEach((index) => {
						store.createIndex(index.name, index.keyPath);
					});
				}
			};
		});
	}

	async addTask(task) {
		await this.init();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction([TASKS_STORE], 'readwrite');
			const store = transaction.objectStore(TASKS_STORE);

			const request = store.add({
				...task,
				timestamp: Date.now(),
			});

			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getTasks(filter = {}) {
		await this.init();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction([TASKS_STORE], 'readonly');
			const store = transaction.objectStore(TASKS_STORE);
			const request = store.getAll();

			request.onsuccess = () => {
				let tasks = request.result;

				// Применяем фильтры
				if (filter.status) {
					tasks = tasks.filter(
						(task) => task.status === filter.status,
					);
				}
				if (filter.type) {
					tasks = tasks.filter((task) => task.type === filter.type);
				}

				resolve(tasks);
			};
			request.onerror = () => reject(request.error);
		});
	}

	async clearTasks() {
		await this.init();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction([TASKS_STORE], 'readwrite');
			const store = transaction.objectStore(TASKS_STORE);
			const request = store.clear();

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}

	async deleteTask(taskId) {
		await this.init();

		return new Promise((resolve, reject) => {
			const transaction = this.db.transaction([TASKS_STORE], 'readwrite');
			const store = transaction.objectStore(TASKS_STORE);
			const request = store.delete(taskId);

			request.onsuccess = () => resolve();
			request.onerror = () => reject(request.error);
		});
	}
}

export const taskDB = new TaskDatabase();
