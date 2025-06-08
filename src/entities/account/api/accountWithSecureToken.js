import { useMutation } from '@tanstack/react-query';
import { getPaginatedAccounts } from './getAccounts';

const useAccountWithSecureToken = () =>
	useMutation({
		mutationFn: async (body, page = 1) =>
			await getPaginatedAccounts(body, true, page, 1),
		mutationKey: ['account with secure token'],
	});

export default useAccountWithSecureToken;
