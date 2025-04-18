import { useMutation, useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = (body, page = 1, offset = 50) => {
	const api = new Api();

	const url = ENDPOINTS.accounts;

	return api.PostAll(url, body, {
		params: { page, offset },
	});
};

const useAccounts = (body) =>
	useQuery({
		queryFn: async () => await getAccounts(body),
		queryKey: ['accounts', body],
		staleTime: 5 * 1000 * 60,
		retry: false,
	});

export const useAccount = () => {
	const accounts = useAccounts();

	return useMutation({
		mutationFn: async (database_id) => {
			const result = await getAccounts({
				database_ids: [database_id],
			});

			return result[0];
		},
		mutationKey: ['account'],
		enabled: accounts.data !== undefined,
	});
};

export default useAccounts;
