import { useQuery } from '@tanstack/react-query';
import getAccounts from '../api/getAccounts';

const useGetAccountsQuery = (groups = []) =>
	useQuery({
		queryFn: () =>
			new Promise((resolve, reject) =>
				getAccounts(groups).then(resolve).catch(reject),
			),
		queryKey: ['accounts', { groups: groups }],
		// staleTime: 5 * 1000 * 60,
		retry: false,
		enabled: groups !== undefined,
	});

export default useGetAccountsQuery;
