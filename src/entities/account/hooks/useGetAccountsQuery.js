import { useQuery } from '@tanstack/react-query';
import getAccounts from '../api/getAccounts';

const useGetAccountsQuery = (group) =>
	useQuery({
		queryFn: () =>
			new Promise((resolve, reject) =>
				getAccounts(group).then(resolve).catch(reject),
			),
		queryKey: ['accounts'],
		// enabled: Boolean(group),
		retry: false,
	});

export default useGetAccountsQuery;
