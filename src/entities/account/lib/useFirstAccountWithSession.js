import { useMutation } from '@tanstack/react-query';
import { deleteSecureToken } from 'shared/api';
import { isCookieAlive } from 'shared/lib/session-cookies';
import useAccountWithSecureToken from '../api/accountWithSecureToken';
import useUpdateProfile from './updateProfile';

const useFirstAccountWithSession = () => {
	const accountWithSecureToken = useAccountWithSecureToken();
	const updateProfile = useUpdateProfile();

	const mutationFn = async ({ onProccess, onTotalGet }) => {
		let total = 0;

		do {
			const accountRequest = await accountWithSecureToken.mutateAsync();
			total = accountRequest.total;
			if (onTotalGet) {
				onTotalGet(total);
			}
			const account = accountRequest.result[0];

			if (!account) return;

			const database_id = account.database_id;

			if (!isCookieAlive(account.cookies)) {
				deleteSecureToken(database_id);
				if (onProccess) {
					onProccess(account);
				}
				continue;
			}

			try {
				const result = await updateProfile.mutateAsync({
					database_id,
				});
				return { database_id, result };
			} catch (_e) {
				if (onProccess) {
					onProccess(account);
				}
				continue;
			}
		} while (total);

		return;
	};

	return useMutation({
		mutationFn,
	});
};

export default useFirstAccountWithSession;
