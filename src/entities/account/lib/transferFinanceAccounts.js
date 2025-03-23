const transferFinanceAccounts = (account, finance_accounts) => {
	/* finance_accounts = {
		ACCOUNT_TYPE_C2C_YBB: 1.0,
		ACCOUNT_TYPE_MARGIN_STAKE: 0.1,
		ACCOUNT_TYPE_FIXED_RATE_LOAN: 0.01,
		ACCOUNT_TYPE_PLEDGE_LOANS: 0.001,
		ACCOUNT_TYPE_COPY_TRADE_ALL: 10.0,
		ACCOUNT_TYPE_COPY_TRADE: 100.0,
		ACCOUNT_TYPE_COPY_PRO: 0.0,
		ACCOUNT_TYPE_PRE_MARKET_TRADING: 0.0,
		ACCOUNT_TYPE_LAUNCHPOOL: 0.0,
		ACCOUNT_TYPE_FUND: 0.0,
		ACCOUNT_TYPE_UNIFIED: 0.0,
		ACCOUNT_TYPE_INVESTMENT: 0.0,
	}; */

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
		balance: finance_accounts
			? account.trading_balance || '0'
			: 'update required',
		...finance_accounts,
	};
};

export default transferFinanceAccounts;
