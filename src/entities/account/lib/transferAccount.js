import findLatestExpires from './findLatestExpires';
import getMarksArray from './getMarksArray';
import getWarnings from './getWarnings';

const transferAccount = (account) => {
	const sessoinCookie = account.cookies?.filter(
		(cookie) => cookie.name === 'secure-token',
	);
	return {
		id: account.database_id,
		name: account.name,
		group_name: account.group_name,
		email: account.email.address,
		imap: account.email.imap_address,
		balance: account.trading_balance || '0',
		web3_balance: account.web3_balance || '0',
		kyc: (account.kyc_level || '') + ' ' + (account.country || ''),
		loginCountry:
			(account.last_login_country_code || '') +
			' ' +
			(account.last_login_ip || ''),
		marks: getMarksArray(account),
		session: sessoinCookie?.length
			? new Date(findLatestExpires(sessoinCookie).expires * 1000)
			: null,
		warnings: getWarnings(account),
	};
};

export default transferAccount;
