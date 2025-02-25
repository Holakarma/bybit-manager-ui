import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = (groups, page = 1, offset = 50) => {
	const api = new Api();

	const body = groups.length ? { groups } : undefined;
	const url = ENDPOINTS.accounts;

	return api.PostAll(url, body, {
		params: { page, offset },
	});
};

export default getAccounts;
