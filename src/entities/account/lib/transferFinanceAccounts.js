const transferFinanceAccounts = (account, finance_accounts) => {
	if (finance_accounts) {
		for (let [k, v] of Object.entries(finance_accounts)) {
			finance_accounts[k] = v || 0;
		}
	}

	return {
		id: account.database_id,
		name: account.name,
		group_name: account.group_name,
		email: account.email.address,
		balance: finance_accounts ? account.balance_usd : null,
		...finance_accounts,
	};
};

export default transferFinanceAccounts;
