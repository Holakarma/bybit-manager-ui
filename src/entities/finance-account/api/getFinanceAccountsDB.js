import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const useGetFinanceAccountsDB = (uids) =>
	useQuery({
		queryFn: () => getFinanceAccountsDB(uids.filter((uid) => Boolean(uid))),
		queryKey: ['finance accounts', { uids }],
		staleTime: 5 * 1000 * 60,
		retry: false,
		enabled: uids !== undefined,
	});

export default useGetFinanceAccountsDB;

const getFinanceAccountsDB = (uids) => {
	const api = new Api();

	const body = uids.length ? { uids } : undefined;
	const url = ENDPOINTS.finance_accounts_db;

	const result = api.Post(url, body);

	return result;
};
