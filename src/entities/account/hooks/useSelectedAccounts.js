import useAccounts from '../api/getAccounts';
import useSelectedAccountsId from '../model/selectedAccountsIdStore';

const useSelectedAccounts = () => {
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();
	const { data: selectedAccounts, ...rest } = useAccounts({
		body: { database_ids: selectedAccountsId },
	});

	return { data: selectedAccounts, ...rest };
};

export default useSelectedAccounts;
