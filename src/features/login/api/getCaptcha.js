import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import SCENE from '../model/sceneEnum';

const getCaptcha = ({
	database_id,
	scene = SCENE.LOGIN,
	loginName,
	signal,
}) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.get_captcha,
		{ scene, login_name: loginName },
		{
			signal,
			params: { database_id },
		},
	);
};

const useGetCaptcha = () => {
	const mutationFunction = ({ database_id, signal, loginName, scene }) => {
		return deduplicateRequests({
			requestKey: ['get captcha', database_id],
			requestFn: async () => {
				const result = await getCaptcha({
					database_id,
					signal,
					loginName,
					scene,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['get captcha'],
	});
};

export default useGetCaptcha;
