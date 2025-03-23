import { usd } from 'shared/lib/balance-visualize';

const createFinanceAccountsConfig = (accounts) => {
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
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_UNIFIED',
		headerName: 'Trading',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_INVESTMENT',
		headerName: 'Investment',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_LAUNCHPOOL',
		headerName: 'Launchpool',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_C2C_YBB',
		headerName: 'C2C_YBB',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_PRO',
		headerName: 'COPY_PRO',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE',
		headerName: 'COPY_TRADE',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE_ALL',
		headerName: 'COPY_TRADE_ALL',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_MARGIN_STAKE',
		headerName: 'MARGIN_STAKE',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_FIXED_RATE_LOAN',
		headerName: 'FIXED_RATE_LOAN',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_PLEDGE_LOANS',
		headerName: 'PLEDGE_LOANS',
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_PRE_MARKET_TRADING',
		headerName: 'PRE_MARKET_TRADING',
		valueFormatter: (value) => usd(value),
	},
];

export default createFinanceAccountsConfig;
