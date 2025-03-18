import { useQuery } from '@tanstack/react-query';
import getAccounts from '../api/getAccounts';

const useGetAccountsQuery = (groups = []) =>
	useQuery({
		queryFn: () => getAccounts(groups),
		queryKey: ['accounts', { groups: groups }],
		// staleTime: 5 * 1000 * 60,
		retry: false,
		enabled: groups !== undefined,
	});

export default useGetAccountsQuery;
