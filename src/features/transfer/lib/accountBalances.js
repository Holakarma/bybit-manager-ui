import { FINANCE_ACCOUNT_TYPE } from 'entities/finance-account';
import { useAllFundingCoins, useAllTradingCoins } from './allTransferCoins';

const useAccountBalances = (databaseIds) => {
	const allTradingCoins = useAllTradingCoins({ database_ids: databaseIds });
	const allFundingCoins = useAllFundingCoins({ database_ids: databaseIds });

	if (!allTradingCoins || !allFundingCoins) return undefined;

	const balances = {
		[FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_FUND]: {},
		[FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_UNIFIED]: {},
	};

	allTradingCoins.forEach((coinsQuery) => {
		if (coinsQuery.data) {
			const coins = Object.values(coinsQuery.data);
			const type = FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_UNIFIED;

			coins.forEach((coin) => {
				if (!balances[type][coin.symbol]) {
					balances[type][coin.symbol] = {
						balance: coin.available_balance,
						count: 1,
					};
				} else {
					balances[type][coin.symbol] = {
						balance:
							balances[type][coin.symbol].balance +
							coin.available_balance,
						count: balances[type][coin.symbol].count + 1,
					};
				}
			});
		}
	});
	allFundingCoins.forEach((coinsQuery) => {
		if (coinsQuery.data) {
			const coins = Object.values(coinsQuery.data);
			const type = FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_FUND;

			coins.forEach((coin) => {
				if (!balances[type][coin.symbol]) {
					balances[type][coin.symbol] = {
						balance: coin.available_balance,
						count: 1,
					};
				} else {
					balances[type][coin.symbol] = {
						balance:
							balances[type][coin.symbol].balance +
							coin.available_balance,
						count: balances[type][coin.symbol].count + 1,
					};
				}
			});
		}
	});

	return balances;
};

export default useAccountBalances;
