import { useMemo } from 'react';
import useAccounts from '../api/getAccounts';
import getAccountsById from '../lib/getAccountsById';
import useSelectedAccountsId from '../model/selectedAccountsIdStore';

const useSelectedAccounts = () => {
	// @FIXME: fix the situation when selected in LS accounts are removed from the db
	const { data: accounts, ...rest } = useAccounts();
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
