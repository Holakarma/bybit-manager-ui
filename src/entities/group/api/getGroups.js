import { Api, ENDPOINTS } from 'shared/api';

const getGroups = () => {
	const api = new Api();

	return new Promise((resolve, reject) => {
		api.Get({ url: ENDPOINTS.groups })
			.then((result) => resolve(result))
			.catch((error) => reject(error));
	});
};

export default getGroups;
