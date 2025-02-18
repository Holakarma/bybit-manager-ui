import { useMemo } from 'react';
import useSelectedAccountsId from '../model/selectedAccountsIdStore';
import useGetAccountsQuery from './useGetAccountsQuery';

const useSelectedAccounts = () => {
	const { data: accounts, ...rest } = useGetAccountsQuery([]);
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();

	const selectedAccounts = useMemo(() => {
		if (accounts && selectedAccountsId) {
			let result = [];

			selectedAccountsId.forEach((id) => {
				const account = accounts.find((a) => a.database_id === id);
				if (account) {
					result.push(account);
				}
			});

			return result;
		}
		return null;
	}, [accounts, selectedAccountsId]);

	return { data: selectedAccounts, ...rest };
};

export default useSelectedAccounts;
