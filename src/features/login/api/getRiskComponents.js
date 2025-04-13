import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const getRiskTokenComponents = ({ database_id, signal, riskToken }) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.get_risk_components,
		{ risk_token: riskToken },
		{
			signal,
			params: { database_id },
		},
	);
};

const useGetRiskTokenComponents = () => {
	const mutationFunction = ({ database_id, signal, riskToken }) => {
		return deduplicateRequests({
			requestKey: ['get risk token components', database_id],
			requestFn: async () => {
				const result = await getRiskTokenComponents({
					database_id,
					signal,
					riskToken,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['get risk token components'],
	});
};

export default useGetRiskTokenComponents;
