import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = (groups, page = 1, offset = 10) => {
	const api = new Api();

	const params = groups.length ? { groups } : undefined;
	const url = ENDPOINTS.accounts;

	return new Promise((resolve, reject) => {
		api.AllPages({
			request: api.Post,
			url,
			params,
			query: { page, offset },
		})
			.then((result) => {
				resolve(result);
			})
			.catch((error) => reject(error));
	});
};

export default getAccounts;
