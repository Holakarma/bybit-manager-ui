import { Api, ENDPOINTS } from 'shared/api';

/**
 *
 * @param {Object} updatingAccount
 * @param {string | number} updatingAccount.id
 * @param {string} updatingAccount.name
 * @param {string} updatingAccount.note
 * @param {string} updatingAccount.group_name
 * @param {string} updatingAccount.kyc_provider_telegram_username
 * @param {boolean} updatingAccount.reported_bad
 * @param {string} updatingAccount.inviter_ref_code
 * @param {string} updatingAccount.adspower_profile_id
 * @param {number} updatingAccount.default_withdraw_address_id
 * @param {string} updatingAccount.preferred_country_code
 * @param {string} updatingAccount.proxy
 * @param {string} updatingAccount.sumsub_proxy
 * @param {string} updatingAccount.onfido_proxy
 * @returns {Promise<any>} .
 */

const updateAccount = (account) => {
	const api = new Api();

	if (!account.id) {
		throw new Error('Account id is required');
	}

	const { id, ...updatingFields } = account;

	return new Promise((resolve, reject) => {
		api.Patch({
			url: ENDPOINTS.update_account,
			query: { database_id: id },
			params: updatingFields,
		})
			.then(resolve)
			.catch(reject);
	});
};

export default updateAccount;
