import { useQuery } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import { isCookieAlive } from 'shared/lib/session-cookies';

const getCoinsChains = ({ database_id, signal }) => {
	const api = new Api();

	return api.Get(ENDPOINTS.coins_chains, {
		params: { database_id },
		signal,
	});
};

const useCoinsChains = (database_id, onError) => {
	const accountMutation = useAccount();

	const queryFn = () =>
		deduplicateRequests({
			requestKey: ['coins-chains', database_id],
			requestFn: async () => {
				const account = await accountMutation.mutateAsync(database_id);

				if (!isCookieAlive(account.cookies)) {
					if (onError) onError();
					throw Error('Account is not alive');
				}

				try {
					return await getCoinsChains({ database_id });
				} catch (e) {
					if (onError) {
						onError();
					}
					throw new Error(e.message);
				}
			},
		});

	return useQuery({
		queryFn,
		queryKey: ['coins-chains', database_id],
		enabled: Boolean(database_id),
		staleTime: 50 * 1000 * 60,
		retry: false,
	});
};

export default useCoinsChains;
