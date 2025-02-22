/**
 * @typedef {Object} Task
 * @property {number} id
 * @property {string} taskId
 * @property {string} type
 * @property {string} TaskStatus
 * @property {number} timestamp
 * @property {Object} data
 */

export const TaskStatus = {
	PENDING: 'pending',
	COMPLETED: 'completed',
	FAILED: 'failed',
};

export const TaskType = {
	LOGIN: 'login',
	IMPORT: 'import',
	EXPORT: 'export',
};
