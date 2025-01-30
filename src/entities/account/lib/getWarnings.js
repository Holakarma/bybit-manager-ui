import WARNINGS from '../model/warnings';

const getWarnings = (account) => {
	let result = [];

	if (account.facial_verification_required) {
		result.push(WARNINGS.facial);
	}
	if (account.proxy_error) {
		result.push(WARNINGS.bybit_proxy);
	}
	if (account.email.proxy_error) {
		result.push(WARNINGS.email_proxy);
	}
	if (account.kyc_level) {
		if (!account.totp_enabled) {
			result.push(WARNINGS['2fa']);
		}
	}

	return result;
};

export default getWarnings;
