import { useMutation } from '@tanstack/react-query';
import useDefaultAccount from '../model/defaultAccountStore';
import useFirstAccountWithSession from './useFirstAccountWithSession';

const useSetAliveDefaultAccount = () => {
	const firstAccountWithSession = useFirstAccountWithSession();
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();

	const mutationFn = async ({ onProccess, onTotalGet }) => {
		const account = await firstAccountWithSession.mutateAsync({
			onProccess,
			onTotalGet,
		});
		if (account) {
			setDefaultAccountId(account.database_id);
		}
		throw Error('No account found');
	};

	return useMutation({ mutationFn });
};

export default useSetAliveDefaultAccount;
