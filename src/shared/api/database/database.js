import { DB_NAME, DB_VERSION, SCHEMA } from './schema';

class Database {
	constructor() {
		this.db = null;
		this.dbName = DB_NAME;
		this.dbVersion = DB_VERSION;
		this.schema = SCHEMA;
	}

	init() {
		if (this.db) return Promise.resolve(this.db);

		return new Promise((resolve, reject) => {
			const request = indexedDB.open(this.dbName, this.dbVersion);

			request.onerror = () => reject(request.error);
			request.onsuccess = () => {
				this.db = request.result;
				this.db.onversionchange = () => {
					this.db.close();
					alert('Database version is deprecated, refresh the page.');
				};
				resolve(this.db);
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;
				this.schema.stores.forEach((storeConfig) => {
					if (!db.objectStoreNames.contains(storeConfig.name)) {
						const store = db.createObjectStore(storeConfig.name, {
							keyPath: storeConfig.keyPath,
							autoIncrement: storeConfig.autoIncrement || false,
						});
						storeConfig.indexes.forEach((index) => {
							store.createIndex(index.name, index.keyPath, {
								unique: index.unique || false,
							});
						});
					}
				});
			};
		});
	}

	async transaction(storeName, mode = 'readonly') {
		await this.init();
		return this.db.transaction(storeName, mode);
	}

	async getObjectStore(storeName, mode = 'readonly') {
		const transaction = await this.transaction(storeName, mode);
		return transaction.objectStore(storeName);
	}

	async addRow(STORE, row) {
		const store = await this.getObjectStore(STORE, 'readwrite');

		return new Promise((resolve, reject) => {
			const request = store.add({
				...row,
				timestamp: Date.now(),
			});
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	async getRows(STORE, filter = {}) {
		const store = await this.getObjectStore(STORE);
		return new Promise((resolve, reject) => {
			const request = store.getAll();

			request.onsuccess = () => {
				let rows = request.result;

				for (let [filterKey, filterValue] of Object.entries(filter)) {
					rows = rows.filter((row) => row[filterKey] === filterValue);
				}

				resolve(rows);
			};
			request.onerror = () => reject(request.error);
		});
	}

	async clearRows(STORE) {
		const store = await this.getObjectStore(STORE, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.clear();
			request.onsuccess = resolve;
			request.onerror = () => reject(request.error);
		});
	}

	async deleteRow(STORE, rowId) {
		const store = await this.getObjectStore(STORE, 'readwrite');
		return new Promise((resolve, reject) => {
			const request = store.delete(rowId);
			request.onsuccess = resolve;
			request.onerror = () => reject(request.error);
		});
	}

	async updateRow(STORE, rowId, updatedData) {
		const store = await this.getObjectStore(STORE, 'readwrite');

		return new Promise((resolve, reject) => {
			const getRequest = store.get(rowId);

			getRequest.onsuccess = () => {
				const existingRow = getRequest.result;

				if (!existingRow) {
					reject(
						new Error(
							`Row with ID ${rowId} not found in store ${STORE}`,
						),
					);
					return;
				}

				const updatedRow = {
					...existingRow,
					...updatedData,
					timestamp: Date.now(),
				};

				const putRequest = store.put(updatedRow);

				putRequest.onsuccess = () => resolve(putRequest.result);
				putRequest.onerror = () => reject(putRequest.error);
			};

			getRequest.onerror = () => reject(getRequest.error);
		});
	}
}

export default Database;
