import importAccount from '../api/importAccount';
import AccountDTO from '../model/accountDTO';
import isAccountEmpty from './isAccountEmpty';

const mutateImportAccounts = ({ form, onError, onSuccess }) => {
	const accounts = {};
	for (const [key, value] of form.entries()) {
		const match = key.match(/^accounts\[(\d+-\d+)\]\[(\w+)\]$/);
		if (match) {
			const [, id, field] = match;
			accounts[id] = accounts[id] || {};
			accounts[id][field] = value || undefined;
		}
	}

	const accountList = Object.values(accounts).filter(
		(account) => !isAccountEmpty(account),
	);

	const importAccountsSequentially = (index = 0, results = []) =>
		new Promise((resolve) => {
			if (index >= accountList.length) {
				return resolve(results);
			}

			const account = new AccountDTO(accountList[index]);

			return importAccount(account)
				.then((result) => {
					if (onSuccess) onSuccess(accountList[index], result);
					results.push(result);
				})
				.catch((error) => {
					if (onError) onError(account, error);
					results.push({ success: false, account, error });
				})
				.finally(() => {
					resolve(importAccountsSequentially(index + 1, results));
				});
		});

	return importAccountsSequentially();
};

export default mutateImportAccounts;
