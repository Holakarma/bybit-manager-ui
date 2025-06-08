import { useMutation, useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getDepositAddresses = ({ uids, coin_symbol, chain }) => {
	const api = new Api();

	return api.Post(
		ENDPOINTS.db_deposit_addresess,
		{ uids },
		{
			params: {
				coin_symbol,
				chain,
			},
		},
	);
};

const useDepositAddresses = ({ uids, coin_symbol, chain, enabled = true }) => {
	return useQuery({
		queryFn: async () =>
			await getDepositAddresses({ uids, coin_symbol, chain }),
		queryKey: [ENDPOINTS.db_deposit_addresess, uids, coin_symbol, chain],
		enabled:
			enabled && Boolean(uids) && Boolean(coin_symbol) && Boolean(chain),
		retry: false,
	});
};

export const useDepositAddressesMutation = () => {
	return useMutation({
		mutationFn: async ({ uids, coin_symbol, chain }) =>
			await getDepositAddresses({ uids, coin_symbol, chain }),
		mutationKey: [ENDPOINTS.db_deposit_addresess],
	});
};

export default useDepositAddresses;
