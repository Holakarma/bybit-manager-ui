import { useMutation, useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getAccounts = (body, only_with_secure_token = false) => {
	const api = new Api();

	const url = ENDPOINTS.accounts;

	return api.PostAll(url, body, {
		params: { only_with_secure_token },
	});
};

export const getPaginatedAccounts = (
	body,
	only_with_secure_token,
	page = 1,
	offset = 50,
) => {
	const api = new Api();

	const url = ENDPOINTS.accounts;

	return api.Post(url, body, {
		params: { page, offset, only_with_secure_token },
	});
};

export const usePaginatedAccounts = ({
	body,
	only_with_secure_token,
	page,
	offset,
}) =>
	useQuery({
		queryFn: async () =>
			await getPaginatedAccounts(
				body,
				only_with_secure_token,
				page,
				offset,
			),
		queryKey: ['accounts', body, page, offset, only_with_secure_token],
		staleTime: 5 * 1000 * 60,
		retry: false,
	});

const useAccounts = ({ body, only_with_secure_token } = {}) =>
	useQuery({
		queryFn: async () => await getAccounts(body, only_with_secure_token),
		queryKey: ['accounts', body, only_with_secure_token],
		staleTime: 5 * 1000 * 60,
		retry: false,
	});

export const useAccount = () => {
	return useMutation({
		mutationFn: async (database_id) => {
			const result = await getAccounts({
				database_ids: [database_id],
			});

			return result[0];
		},
		mutationKey: ['account'],
	});
};
export const useAccountsMutation = () => {
	return useMutation({
		mutationFn: async (body) => {
			const result = await getAccounts(body);

			return result;
		},
		mutationKey: ['account'],
	});
};

export default useAccounts;
