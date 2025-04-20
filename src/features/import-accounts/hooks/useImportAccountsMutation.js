import { useMutation } from '@tanstack/react-query';
import importAccount from '../api/importAccount';
import AccountDTO from '../model/accountDTO';
import useAccounts from '../model/accountsToImportStore';

const useImportAccountsMutation = () => {
	const accounts = useAccounts.use.accounts();

	const mutationFn = async ({ onSuccess, onError }) => {
		for (const account of accounts.slice(0, -1)) {
			if (!account.bybit_email || !account.group) {
				onError(account, { detail: 'email & group are required' });
				continue;
			}

			const accountDTO = new AccountDTO(account);

			try {
				const result = await importAccount(accountDTO);
				onSuccess(account, result);
			} catch (error) {
				onError(account, error);
			}
		}
	};

	return useMutation({
		mutationFn,
		mutationKey: ['import-accounts'],
	});
};

export default useImportAccountsMutation;
