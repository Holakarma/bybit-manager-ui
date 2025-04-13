import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const login = ({
	database_id,
	signal,
	verifiedCaptchaToken,
	verifiedRiskToken = '',
}) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.login_account,
		{
			verified_captcha_token: verifiedCaptchaToken,
			verified_risk_token: verifiedRiskToken,
		},
		{
			signal,
			params: { database_id },
		},
	);
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
				const result = await login({
					database_id,
					signal,
					verifiedCaptchaToken,
					verifiedRiskToken,
				});
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
