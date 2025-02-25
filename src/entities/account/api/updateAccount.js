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
		throw Error('Account id is required');
	}

	const { id, ...updatingFields } = account;

	return api.Patch(ENDPOINTS.update_account, updatingFields, {
		params: { database_id: id },
	});
};

export default updateAccount;
