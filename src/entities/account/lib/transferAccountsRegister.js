const transferAccountsRegister = (account) => {
	return {
		id: account.database_id,
		name: account.name,
		group_name: account.group_name,
		email: account.email.address,
		registered: account.registered,
		ref_colde: account.ref_code,
	};
};

export default transferAccountsRegister;
