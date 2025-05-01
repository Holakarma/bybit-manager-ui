import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const isEmailExist = async ({ database_id, signal, email }) => {
	const api = new Api();

	return await api.Get(ENDPOINTS.is_email_exist, {
		signal,
		params: { database_id, address: email },
	});
};

const useIsEmailExistMutation = () => {
	const mutationFunction = ({ database_id, signal, email }) => {
		return deduplicateRequests({
			requestKey: ['is-email-exist', database_id],
			requestFn: async () => {
				const result = await isEmailExist({
					database_id,
					signal,
					email,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['is-email-exist'],
	});
};

export default useIsEmailExistMutation;
