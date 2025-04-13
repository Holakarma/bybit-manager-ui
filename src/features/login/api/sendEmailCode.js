import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const sendEmailCode = ({
	database_id,
	signal,
	riskToken,
	componentId = 'email_verify',
}) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.send_email_code,
		{ risk_token: riskToken, component_id: componentId },
		{
			signal,
			params: { database_id },
		},
	);
};

const useSendEmailCode = () => {
	const mutationFunction = ({
		database_id,
		signal,
		riskToken,
		componentId,
	}) => {
		return deduplicateRequests({
			requestKey: ['send email code', database_id],
			requestFn: async () => {
				const result = await sendEmailCode({
					database_id,
					signal,
					riskToken,
					componentId,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['send email code'],
	});
};

export default useSendEmailCode;
