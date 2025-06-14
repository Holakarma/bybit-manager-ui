import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const useGetFinanceAccountsDB = ({ uids, enabled = true }) => {
	return useQuery({
		queryFn: () => {
			const validUids = uids.filter((uid) => Boolean(uid));

			if (!validUids.length) {
				return [];
			}
			return getFinanceAccountsDB(validUids);
		},
		queryKey: ['finance accounts', { uids }],
		staleTime: 5 * 1000 * 60,
		retry: false,
		enabled: uids !== undefined && enabled,
	});
};

export default useGetFinanceAccountsDB;

const getFinanceAccountsDB = (uids) => {
	const api = new Api();

	const body = uids.length ? { uids } : undefined;
	const url = ENDPOINTS.finance_accounts_db;

	const result = api.Post(url, body);

	return result;
};
