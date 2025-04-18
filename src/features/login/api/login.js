import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const login = ({ database_id, signal, ...body }) => {
	const api = new Api();
	return api.Post(ENDPOINTS.login_account, body, {
		signal,
		params: { database_id },
	});
};

const useLogin = () => {
	const mutationFunction = ({
		database_id,
		signal,
		verifiedCaptchaToken,
		verifiedRiskToken,
	}) => {
		return deduplicateRequests({
			requestKey: ['login', database_id],
			requestFn: async () => {
				const body = {
					verified_captcha_token: verifiedCaptchaToken,
				};

				if (verifiedRiskToken) {
					Object.assign(body, {
						verified_risk_token: verifiedRiskToken,
					});
				}

				const result = await login({ database_id, signal, ...body });
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['login'],
	});
};

export default useLogin;
