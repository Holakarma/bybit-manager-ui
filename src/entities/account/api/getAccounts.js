import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = (body, page = 1, offset = 50) => {
	const api = new Api();

	// const body = groups.length ? { groups } : undefined;
	const url = ENDPOINTS.accounts;

	return api.PostAll(url, body, {
		params: { page, offset },
	});
};

const useGetAccounts = (body) =>
	useQuery({
		queryFn: async () => await getAccounts(body),
		queryKey: ['accounts', body],
		staleTime: 5 * 1000 * 60,
		retry: false,
	});

export default useGetAccounts;
