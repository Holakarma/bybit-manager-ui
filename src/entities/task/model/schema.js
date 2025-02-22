export const DB_NAME = 'app_database';
export const DB_VERSION = 1;
export const TASKS_STORE = 'tasks';

export const schema = {
	name: DB_NAME,
	version: DB_VERSION,
	stores: [
		{
			name: TASKS_STORE,
			keyPath: 'id',
			indexes: [
				{ name: 'timestamp', keyPath: 'timestamp' },
				{ name: 'status', keyPath: 'status' },
				{ name: 'type', keyPath: 'type' },
			],
		},
	],
};
