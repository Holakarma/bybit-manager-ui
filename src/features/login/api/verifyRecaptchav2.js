import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import SCENE from '../model/sceneEnum';

const verifyRecaptchav2 = ({
	database_id,
	signal,
	scene = SCENE.LOGIN,
	serial_no,
	g_recaptcha_response,
}) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.recaptcha_v2_verify,
		{ scene, serial_no, g_recaptcha_response },
		{
			signal,
			params: { database_id },
		},
	);
};

const useVerifyRecaptchav2 = () => {
	const mutationFunction = ({
		database_id,
		signal,
		serial_no,
		g_recaptcha_response,
	}) => {
		return deduplicateRequests({
			requestKey: ['verify recaptcha', database_id],
			requestFn: async () => {
				const result = await verifyRecaptchav2({
					database_id,
					signal,
					serial_no,
					g_recaptcha_response,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['verify recaptcha'],
	});
};

export default useVerifyRecaptchav2;
