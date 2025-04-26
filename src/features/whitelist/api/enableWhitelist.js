import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const enableWhitelist = ({ database_id, verifiedRiskToken, signal }) => {
	const api = new Api();

	return api.Post(
		ENDPOINTS.enable_whitelist,
		{ verified_risk_token: verifiedRiskToken },
		{
			params: { database_id },
			signal,
		},
	);
};

const useEnableWhitelist = () => {
	const mutationFn = ({ database_id, verifiedRiskToken, signal }) => {
		return deduplicateRequests({
			requestKey: ['enable whitelist', database_id],
			requestFn: async () => {
				const result = await enableWhitelist({
					database_id,
					verifiedRiskToken,
					signal,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['enable whitelist'],
	});
};

export default useEnableWhitelist;
