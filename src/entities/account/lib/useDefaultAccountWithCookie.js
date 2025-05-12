import { useMutation } from '@tanstack/react-query';
import useDefaultAccount from '../model/defaultAccountStore';

const useDefaultAccountWithCookie = () => {
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();

	// const { data: accounts } = useAccounts({ cookie: true });

	const mutationFn = () => {
		// alert('Work in progress');
		// console.log(accounts);
	};

	return useMutation({
		mutationFn,
	});
};

export default useDefaultAccountWithCookie;
