import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

export const getTransferCoins = ({
	database_id,
	signal,
	finance_account_type_from,
	finance_account_type_to,
}) => {
	const api = new Api();

	return api.Get(ENDPOINTS.transfer_coins, {
		params: {
			finance_account_type_from,
			finance_account_type_to,
			database_id,
		},
		signal,
	});
};

const useTransferCoins = ({
	database_id,
	finance_account_type_from,
	finance_account_type_to,
}) =>
	useQuery({
		queryKey: ['transfer-coins', database_id],
		queryFn: () =>
			getTransferCoins({
				database_id,
				finance_account_type_from,
				finance_account_type_to,
			}),
		enabled: Boolean(
			database_id && finance_account_type_from && finance_account_type_to,
		),
	});

export default useTransferCoins;
