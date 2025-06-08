import ENDPOINTS from '../model/routes';
import { instance } from './base';
import getCookiesWithoutSession from './getCookiesWithoutSession';

const deleteSecureToken = async (database_id) => {
	const accountReq = await instance.post(ENDPOINTS.accounts, {
		database_ids: [database_id],
	});
	const account = accountReq?.data?.result?.[0];

	if (account) {
		await instance.patch(
			ENDPOINTS.update_account,
			{ cookies: getCookiesWithoutSession(account.cookies) },
			{ params: { database_id } },
		);
	}
};

export default deleteSecureToken;
