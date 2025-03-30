const transferAccounts2fa = (account) => {
	return {
		id: account.database_id,
		name: account.name,
		group_name: account.group_name,
		email: account.email.address,
		totp_secret: account.totp_secret,
		totp_enabled: account.totp_enabled,
	};
};

export default transferAccounts2fa;
