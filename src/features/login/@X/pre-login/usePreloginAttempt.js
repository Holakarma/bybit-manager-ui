import { useMutation } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { useLogs } from 'entities/log';
import { deduplicateRequests } from 'shared/api';
import { getExpireFromAllCookies } from 'shared/lib/session-cookies';
import { useLoginAccountMutation } from '../../api/loginAccount';

const usePreloginAttempt = () => {
	const loginMutation = useLoginAccountMutation();
	const accountMutation = useAccount();
	const addInfoLog = useLogs.use.addInfoLog();

	const mutationFn = ({ database_id, signal, settings, taskId }) => {
		return deduplicateRequests({
			requestKey: ['prelogin-attempt', database_id],
			requestFn: async () => {
				const account = await accountMutation.mutateAsync(database_id);
				const expire = getExpireFromAllCookies(account.cookies);

				/* If account is not logged in */
				if (!expire || expire * 1000 < Date.now()) {
					if (settings.prelogin) {
						addInfoLog({
							message:
								'cookies was not found or expired, try to prelogin account',
							group: taskId,
							database_id,
						});

						try {
							await loginMutation.mutateAsync({
								database_id,
								taskId,
								signal,
							});
						} catch (error) {
							console.log('error in prelogin attempt');
							throw Error(
								`failed to prelogin account: ${error.message}`,
							);
						}
					} else {
						throw Error('account is not logged in, skip');
					}
				}

				return;
			},
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['prelogin-attempt'],
	});
};

export default usePreloginAttempt;
