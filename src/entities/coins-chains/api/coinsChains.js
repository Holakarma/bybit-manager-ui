import { useQuery } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const getCoinsChains = ({ database_id, signal }) => {
	const api = new Api();

	return api.Get(ENDPOINTS.coins_chains, {
		params: { database_id },
		signal,
	});
};

const useCoinsChains = (database_id) => {
	const queryFn = () =>
		deduplicateRequests({
			requestKey: ['coins-chains', database_id],
			requestFn: async () => {
				const result = await getCoinsChains({ database_id });
				return result;
			},
		});

	return useQuery({
		queryFn,
		queryKey: ['coins-chains'],
		enabled: Boolean(database_id),
		staleTime: 50 * 1000 * 60,
		retry: false,
	});
};

export default useCoinsChains;
