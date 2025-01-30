import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = (group) => {
	const api = new Api();

	return new Promise((resolve, reject) => {
		api.Post(
			ENDPOINTS.accounts,
			group
				? {
						groups: [group],
					}
				: undefined,
		)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => reject(error));
	});
};

export default getAccounts;
