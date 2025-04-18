import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const solveGee4Test = ({ database_id, signal, captcha_id }) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.geetest_v4_solve,
		{ captcha_id },
		{
			signal,
			params: { database_id },
		},
	);
};

const useSolveGee4Test = () => {
	const mutationFunction = ({ database_id, signal, captcha_id }) => {
		return deduplicateRequests({
			requestKey: ['solve gee4test', database_id],
			requestFn: async () => {
				const result = await solveGee4Test({
					database_id,
					signal,
					captcha_id,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['solve gee4test'],
	});
};

export default useSolveGee4Test;
