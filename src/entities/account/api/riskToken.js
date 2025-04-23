import { useMutation } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getRiskToken = ({ database_id, signal, sence, extInfo }) => {
	const api = new Api();

	const body = { sence };

	if (extInfo) {
		Object.assign(body, { ext_info: extInfo });
	}

	return api.Post(ENDPOINTS.risk_token, body, {
		params: { database_id },
		signal,
	});
};

const useRiskToken = () => {
	return useMutation({
		mutationFn: ({ database_id, signal, sence, extInfo }) => {
			return getRiskToken({ database_id, signal, sence, extInfo });
		},
		mutationKey: ['risk-token'],
	});
};

export default useRiskToken;
