import { useMemo } from 'react';
import getAccountsById from '../lib/getAccountsById';
import useSelectedAccountsId from '../model/selectedAccountsIdStore';
import useGetAccountsQuery from './useGetAccountsQuery';

const useSelectedAccounts = () => {
	const { data: accounts, ...rest } = useGetAccountsQuery([]);
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();

	const selectedAccounts = useMemo(() => {
		if (accounts && selectedAccountsId) {
			return getAccountsById(accounts, selectedAccountsId);
		}
		return null;
	}, [accounts, selectedAccountsId]);

	return { data: selectedAccounts, ...rest };
};

export default useSelectedAccounts;
