import { getExpireFromAllCookies } from 'shared/lib/session-cookies';
import getMarksArray from './getMarksArray';
import getWarnings from './getWarnings';

const transferAccountGeneral = (account) => {
	const expire = getExpireFromAllCookies(account.cookies);

	return {
		id: account.database_id,
		name: account.name,
		group_name: account.group_name,
		email: account.email.address,
		imap: account.email.imap_address,
		balance: account.balance_usd,
		kyc: (account.kyc_level || '') + ' ' + (account.country || ''),
		loginCountry:
			(account.last_login_country_code || '') +
			' ' +
			(account.last_login_ip || ''),
		marks: getMarksArray(account),
		session: expire ? new Date(expire * 1000) : null,
		warnings: getWarnings(account),
	};
};

export default transferAccountGeneral;
