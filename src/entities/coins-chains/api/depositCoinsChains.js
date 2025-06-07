import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getCoinsChains = ({ database_id, coin_symbol }) => {
	const api = new Api();

	const params = { database_id };
	if (coin_symbol) {
		params.coin_symbol = coin_symbol;
	}

	return api.Get(ENDPOINTS.deposit_coins_chains, {
		params,
	});
};

const useCoinsChains = (params) =>
	useQuery({
		queryFn: () => getCoinsChains(params),
		queryKey: [ENDPOINTS.deposit_coins_chains, params],
		retry: false,
		staleTime: 10 * 10000 * 60,
	});

export default useCoinsChains;
