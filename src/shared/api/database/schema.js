export const DB_NAME = 'app_database';
export const DB_VERSION = 3;

export const TASKS_STORE = 'tasks';
export const CUSTOM_REQUESTS_STORE = 'custom_requests';

export const SCHEMA = {
	name: DB_NAME,
	version: DB_VERSION,
	stores: [
		{
			name: TASKS_STORE,
			keyPath: 'id',
			indexes: [
				{ name: 'timestamp', keyPath: 'timestamp' },
				{ name: 'type', keyPath: 'type' },
				{ name: 'logs', keyPath: 'logs' },
				{ name: 'startedAt', keyPath: 'startedAt' },
				// { name: 'taskId', keyPath: 'taskId' },
			],
		},
		{
			name: CUSTOM_REQUESTS_STORE,
			keyPath: 'id',
			indexes: [
				{ name: 'timestamp', keyPath: 'timestamp' },
				{ name: 'title', keyPath: 'title' },
				{ name: 'method', keyPath: 'method' },
				{ name: 'path', keyPath: 'path' },
				{ name: 'params', keyPath: 'params' },
				{ name: 'json', keyPath: 'json' },
				{ name: 'data', keyPath: 'data' },
				{ name: 'bodyType', keyPath: 'bodyType' },
			],
		},
	],
};
