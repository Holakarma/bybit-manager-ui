import { useQueries } from '@tanstack/react-query';
import {
	getFundingCoins,
	getTradingCoins,
	getTransferCoins,
} from '../api/transferCoins';

const useAllTransferCoins = ({
	database_ids,
	finance_account_type_from,
	finance_account_type_to,
}) =>
	useQueries({
		queries: database_ids.map((database_id) => {
			return {
				queryKey: ['available-coins', database_id],
				queryFn: async () =>
					await getTransferCoins({
						database_id,
						finance_account_type_from,
						finance_account_type_to,
					}),
				staleTime: Infinity,
				retry: false,
			};
		}),
	});

export const useAllTradingCoins = ({ database_ids, signal }) =>
	useQueries({
		queries: database_ids.map((database_id) => {
			return {
				queryKey: ['available-trading-coins', database_id],
				queryFn: async () =>
					await getTradingCoins({
						database_id,
						signal,
					}),
				staleTime: Infinity,
				retry: false,
			};
		}),
	});

export const useAllFundingCoins = ({ database_ids, signal }) =>
	useQueries({
		queries: database_ids.map((database_id) => {
			return {
				queryKey: ['available-funding-coins', database_id],
				queryFn: async () =>
					await getFundingCoins({
						database_id,
						signal,
					}),
				staleTime: Infinity,
			};
		}),
	});

const useAllAvailableTransferCoins = ({
	database_ids,
	finance_account_type_from,
	finance_account_type_to,
}) => {
	const queryArray = useAllTransferCoins({
		database_ids,
		finance_account_type_from,
		finance_account_type_to,
	});

	return (
		queryArray ||
		queryArray((query) => query.data.filter((coin) => coin.total))
	);
};

export default useAllAvailableTransferCoins;
