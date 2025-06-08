import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const updateProfile = (database_id, signal) => {
	const api = new Api();
	return api.Get(ENDPOINTS.update_profile, {
		signal,
		params: { database_id },
	});
};

const useUpdateProfile = (props) => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: [ENDPOINTS.update_profile, database_id],
			requestFn: async () => {
				const result = await updateProfile(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: [ENDPOINTS.update_profile],
		...props,
	});
};

export default useUpdateProfile;
