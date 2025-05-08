import { useQueries } from '@tanstack/react-query';
import { getTransferCoins } from '../api/transferCoins';

const useAllTransferCoins = ({
	database_ids,
	finance_account_type_from,
	finance_account_type_to,
}) =>
	useQueries({
		queries: database_ids.map((database_id) => {
			return {
				queryKey: [
					'transfer-coins',
					database_id,
					finance_account_type_from,
					finance_account_type_to,
				],
				queryFn: async () => {
					const result = await getTransferCoins({
						database_id,
						finance_account_type_from,
						finance_account_type_to,
					});

					return { result, database_id };
				},
				staleTime: Infinity,
				retry: false,
			};
		}),
	});

export default useAllTransferCoins;
