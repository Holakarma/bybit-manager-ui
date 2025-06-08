import { useQuery } from '@tanstack/react-query';
import { isCookieAlive } from 'shared/lib/session-cookies';
import { useAccount } from '../api/getAccounts';
import useUpdateProfile from './updateProfile';

const useSessionChecker = (database_id) => {
	const getAccount = useAccount();
	const updateProfile = useUpdateProfile();

	const queryFn = async () => {
		const account = await getAccount.mutateAsync(database_id);
		if (isCookieAlive(account.cookies)) {
			const result = await updateProfile.mutateAsync({
				database_id,
			});

			if (result) return true;
		}

		return false;
	};

	return useQuery({
		queryFn,
		queryKey: ['session-check', database_id],
		enabled: Boolean(database_id),
		staleTime: 5 * 1000 * 60,
		retry: false,
	});
};

export default useSessionChecker;
