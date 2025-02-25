import { Api, ENDPOINTS } from 'shared/api';

const importAccount = (account) => {
	const api = new Api();

	const url = ENDPOINTS.import_account;

	return api.Post(url, account);
};

export default importAccount;
