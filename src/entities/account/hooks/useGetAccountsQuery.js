import { useQuery } from '@tanstack/react-query';
import getAccounts from '../api/getAccounts';

const useGetAccountsQuery = () =>
	useQuery({
		queryFn: getAccounts,
		queryKey: ['accounts'],
		retry: false,
	});

export default useGetAccountsQuery;
