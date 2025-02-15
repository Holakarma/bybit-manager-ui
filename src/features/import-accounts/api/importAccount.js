import { Api, ENDPOINTS } from 'shared/api';

const importAccount = (account) => {
	const api = new Api();

	const url = ENDPOINTS.import_account;

	return api.Post({
		url,
		params: {
			...account,
		},
	});
};

export default importAccount;
