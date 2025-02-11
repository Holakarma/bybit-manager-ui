import { Api, ENDPOINTS } from 'shared/api';

const importAccount = (account) => {
	const api = new Api();

	const url = ENDPOINTS.import_account;

	return new Promise((resolve, reject) => {
		api.Post({
			url,
			params: {
				email: {
					address: account.bybit_email,
					imap_address: account.imap_address,
					imap_password: account.imap_password,
				},
				password: account.bybit_password,
			},
		})
			.then((result) => {
				resolve(result);
			})
			.catch((e) => reject(e.response));
	});
};

export default importAccount;
