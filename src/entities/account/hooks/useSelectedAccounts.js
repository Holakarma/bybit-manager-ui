import useAccounts from '../api/getAccounts';
import useSelectedAccountsId from '../model/selectedAccountsIdStore';

const useSelectedAccounts = () => {
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();
	console.log(selectedAccountsId);
	const { data: selectedAccounts, ...rest } = useAccounts({
		database_ids: selectedAccountsId,
	});

	return { data: selectedAccounts, ...rest };
};

export default useSelectedAccounts;
