import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const solveRecaptchav2 = ({ database_id, signal, google_id }) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.recaptcha_v2_solve,
		{ google_id },
		{
			signal,
			params: { database_id },
		},
	);
};

const useSolveRecaptchav2 = () => {
	const mutationFunction = ({ database_id, signal, google_id }) => {
		return deduplicateRequests({
			requestKey: ['solve recaptcha', database_id],
			requestFn: async () => {
				const result = await solveRecaptchav2({
					database_id,
					signal,
					google_id,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['solve recaptcha'],
	});
};

export default useSolveRecaptchav2;
