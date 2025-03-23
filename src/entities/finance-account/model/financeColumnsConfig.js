import { usd } from 'shared/lib/balance-visualize';

const createFinanceAccountsConfig = (accounts, widths) => {
	return financeColumnsConfig(widths).filter(
		(column) =>
			!accounts.every(
				(account) =>
					account[column.field] === 0 ||
					account[column.field] === undefined,
			),
	);
};

const financeColumnsConfig = (widths) => [
	{
		field: 'ACCOUNT_TYPE_FUND',
		headerName: 'Funding',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_FUND'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_UNIFIED',
		headerName: 'Trading',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_UNIFIED'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_INVESTMENT',
		headerName: 'Investment',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_INVESTMENT'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_LAUNCHPOOL',
		headerName: 'Launchpool',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_LAUNCHPOOL'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_C2C_YBB',
		headerName: 'C2C_YBB',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_C2C_YBB'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_PRO',
		headerName: 'COPY_PRO',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_COPY_PRO'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE',
		headerName: 'COPY_TRADE',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_COPY_TRADE'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_COPY_TRADE_ALL',
		headerName: 'COPY_TRADE_ALL',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_COPY_TRADE_ALL'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_MARGIN_STAKE',
		headerName: 'MARGIN_STAKE',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_MARGIN_STAKE'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_FIXED_RATE_LOAN',
		headerName: 'FIXED_RATE_LOAN',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_FIXED_RATE_LOAN'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_PLEDGE_LOANS',
		headerName: 'PLEDGE_LOANS',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_PLEDGE_LOANS'] || 100,
		valueFormatter: (value) => usd(value),
	},
	{
		field: 'ACCOUNT_TYPE_PRE_MARKET_TRADING',
		headerName: 'PRE_MARKET_TRADING',
		minWidth: 100,
		maxWidth: 150,
		width: widths['ACCOUNT_TYPE_PRE_MARKET_TRADING'] || 100,
		valueFormatter: (value) => usd(value),
	},
];

export default createFinanceAccountsConfig;
