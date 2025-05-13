import useAllTransferCoins from './allTransferCoins';

const useAccountBalances = ({ databaseIds, from, to }) => {
	const transferCoins = useAllTransferCoins({
		database_ids: databaseIds,
		finance_account_type_from: from,
		finance_account_type_to: to,
	});

	console.log(transferCoins);

	const balances = {};

	if (!transferCoins) return;

	for (const coinsQuery of transferCoins) {
		if (!coinsQuery.data) return;
		if (coinsQuery.data.result) {
			const coins = coinsQuery.data.result;

			coins.forEach((coin) => {
				if (coin.total_balance === '0') return;

				if (!balances[coin.symbol]) {
					balances[coin.symbol] = {
						balance: parseFloat(coin.transfer_balance),
						balance_usd: parseFloat(coin.transfer_balance_usd),
						ids: [coinsQuery.data.database_id],
						icon: coin.coin_icon_night || coin.coin_icon,
						precision: coin.precision,
					};
				} else {
					balances[coin.symbol] = {
						balance:
							balances[coin.symbol].balance +
							parseFloat(coin.transfer_balance),
						balance_usd:
							balances[coin.symbol].balance +
							parseFloat(coin.transfer_balance_usd),
						ids: [
							...balances[coin.symbol].ids,
							coinsQuery.data.database_id,
						],
						icon: coin.coin_icon_night || coin.coin_icon,
						precision: coin.precision,
					};
				}
			});
		}
	}

	return balances;
};

export default useAccountBalances;
