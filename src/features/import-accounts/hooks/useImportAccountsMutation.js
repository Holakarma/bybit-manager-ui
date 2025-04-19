import { useMutation } from '@tanstack/react-query';
import importAccount from '../api/importAccount';
import AccountDTO from '../model/accountDTO';
import useAccounts from '../model/accountsToImportStore';

const useImportAccountsMutation = () => {
	const accounts = useAccounts.use.accounts();

	const mutationFn = ({ onSuccess, onError }) => {
		accounts.slice(0, -1).forEach(async (account) => {
			if (!account.bybit_email || !account.group) {
				onError(account, { detail: 'email & group are required' });
				return;
			}

			const accountDTO = new AccountDTO(account);

			try {
				const result = await importAccount(accountDTO);
				onSuccess(account, result);
			} catch (error) {
				onError(account, error);
			}
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['import-accounts'],
		// mutationFn: ({ form, onSuccess, onError }) =>
		// 	mutateImportAccounts({ form, onSuccess, onError }),
	});
};

export default useImportAccountsMutation;
