import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import SCENE from '../model/sceneEnum';

const verifyGee4Test = ({
	database_id,
	signal,
	scene = SCENE.LOGIN,
	serial_no,
	login_name,
	captcha_output,
	lot_number,
	pass_token,
	gee4test_gen_time,
}) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.geetest_v4_verify,
		{
			scene,
			serial_no,
			login_name,
			captcha_output,
			lot_number,
			pass_token,
			gee4test_gen_time,
		},
		{
			signal,
			params: { database_id },
		},
	);
};

const useVerifyGee4Test = () => {
	const mutationFunction = ({
		database_id,
		signal,
		serial_no,
		login_name,
		captcha_output,
		lot_number,
		pass_token,
		gee4test_gen_time,
	}) => {
		return deduplicateRequests({
			requestKey: ['verify gee4test', database_id],
			requestFn: async () => {
				const result = await verifyGee4Test({
					database_id,
					signal,
					serial_no,
					login_name,
					captcha_output,
					lot_number,
					pass_token,
					gee4test_gen_time,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['verify gee4test'],
	});
};

export default useVerifyGee4Test;
