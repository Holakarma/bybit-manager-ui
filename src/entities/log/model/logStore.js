import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const errorLog = (error, database_id) => ({
	type: 'error',
	database_id,
	message:
		error.error === 'BYBIT_JSON_ERROR'
			? error.bybit_response.ret_msg
			: error.detail?.msg || `${error.message}`,
	time: Date.now(),
});

const infoLog = (message, database_id) => ({
	type: 'info',
	database_id,
	message,
	time: Date.now(),
});

const successLog = (message, database_id) => ({
	type: 'success',
	database_id,
	message,
	time: Date.now(),
});

const useLogStoreBase = create((set) => ({
	logs: { general: [] },

	addLog: ({ newLog, group = 'general' }) =>
		set((state) => {
			return {
				logs: {
					...state.logs,
					[group]: [newLog, ...(state.logs[group] || [])],
				},
			};
		}),

	addErrorLog: ({ error, group = 'general', database_id = null }) =>
		set((state) => {
			return {
				logs: {
					...state.logs,
					[group]: [
						errorLog(error, database_id),
						...(state.logs[group] || []),
					],
				},
			};
		}),

	addInfoLog: ({ message, group = 'general', database_id = null }) =>
		set((state) => {
			return {
				logs: {
					...state.logs,
					[group]: [
						infoLog(message, database_id),
						...(state.logs[group] || []),
					],
				},
			};
		}),

	addSuccessLog: ({ message, group = 'general', database_id = null }) =>
		set((state) => {
			return {
				logs: {
					...state.logs,
					[group]: [
						successLog(message, database_id),
						...(state.logs[group] || []),
					],
				},
			};
		}),
}));

const useLogs = createSelectors(useLogStoreBase);
export default useLogs;
