const createFinanceAccountsConfig = (accounts) => {
	console.log(accounts);

	return financeColumnsConfig.filter(
		(column) =>
			!accounts.every(
				(account) =>
					account[column.field] === 0 ||
					account[column.field] === undefined,
			),
	);
};

const financeColumnsConfig = [
	{
		field: 'ACCOUNT_TYPE_FUND',
		headerName: 'Funding',
	},
	{
		field: 'ACCOUNT_TYPE_UNIFIED',
		headerName: 'Unified',
	},
	{
		field: 'ACCOUNT_TYPE_INVESTMENT',
		headerName: 'Investment',
	},
	{
		field: 'ACCOUNT_TYPE_LAUNCHPOOL',
		headerName: 'Launchpool',
	},
	{
		field: 'ACCOUNT_TYPE_C2C_YBB',
		headerName: 'C2C_YBB',
	},
	{
		field: 'ACCOUNT_TYPE_COPY_PRO',
		headerName: 'COPY_PRO',
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE',
		headerName: 'COPY_TRADE',
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE_ALL',
		headerName: 'COPY_TRADE_ALL',
	},
	{
		field: 'ACCOUNT_TYPE_MARGIN_STAKE',
		headerName: 'MARGIN_STAKE',
	},
	{
		field: 'ACCOUNT_TYPE_FIXED_RATE_LOAN',
		headerName: 'FIXED_RATE_LOAN',
	},
	{
		field: 'ACCOUNT_TYPE_PLEDGE_LOANS',
		headerName: 'PLEDGE_LOANS',
	},
	{
		field: 'ACCOUNT_TYPE_PRE_MARKET_TRADING',
		headerName: 'PRE_MARKET_TRADING',
	},
];

export default createFinanceAccountsConfig;
