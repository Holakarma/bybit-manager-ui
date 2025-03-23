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
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_UNIFIED',
		headerName: 'Trading',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_INVESTMENT',
		headerName: 'Investment',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_LAUNCHPOOL',
		headerName: 'Launchpool',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_C2C_YBB',
		headerName: 'C2C_YBB',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_PRO',
		headerName: 'COPY_PRO',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE',
		headerName: 'COPY_TRADE',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE_ALL',
		headerName: 'COPY_TRADE_ALL',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_MARGIN_STAKE',
		headerName: 'MARGIN_STAKE',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_FIXED_RATE_LOAN',
		headerName: 'FIXED_RATE_LOAN',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_PLEDGE_LOANS',
		headerName: 'PLEDGE_LOANS',
		renderCell: (params) => usd(params.value),
	},
	{
		field: 'ACCOUNT_TYPE_PRE_MARKET_TRADING',
		headerName: 'PRE_MARKET_TRADING',
		renderCell: (params) => usd(params.value),
	},
];

export default createFinanceAccountsConfig;
