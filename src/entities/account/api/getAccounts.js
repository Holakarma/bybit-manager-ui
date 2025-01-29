import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = () => {
	const api = new Api();

	return new Promise((resolve, reject) => {
		api.Post(ENDPOINTS.accounts)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => reject(error));
	});
};

export default getAccounts;
