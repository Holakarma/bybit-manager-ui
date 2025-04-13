import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const getLoginName = (database_id, signal) => {
	const api = new Api();
	return api.Get(ENDPOINTS.login_name, {
		signal,
		params: { database_id },
	});
};

const useLoginName = () => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['login name', database_id],
			requestFn: async () => {
				const result = await getLoginName(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['login name'],
	});
};

export default useLoginName;
