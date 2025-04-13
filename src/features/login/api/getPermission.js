import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const getPermission = (database_id, signal) => {
	const api = new Api();
	return api.Get(ENDPOINTS.permission, {
		signal,
		params: { database_id },
	});
};

const usePermission = () => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['permission', database_id],
			requestFn: async () => {
				const result = await getPermission(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['permission'],
	});
};
export default usePermission;
