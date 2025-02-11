import importAccount from '../api/importAccount';

const mutateImportAccounts = ({ form, onError, onSuccess }) => {
	const accounts = {};
	for (const [key, value] of form.entries()) {
		const match = key.match(/^accounts\[(\d+-\d+)\]\[(\w+)\]$/);
		if (match) {
			const [, id, field] = match;
			accounts[id] = accounts[id] || {};
			accounts[id][field] = value;
		}
	}

	const accountList = Object.values(accounts);

	const importAccountsSequentially = (index = 0, results = []) => {
		if (index >= accountList.length) {
			return Promise.resolve(results);
		}

		const account = accountList[index];
		if (!account.bybit_email) return;

		return importAccount(account)
			.then((result) => {
				if (onSuccess) onSuccess(account, result);
				results.push(result);
				return importAccountsSequentially(index + 1, results);
			})
			.catch((error) => {
				if (onError) onError(account, error);
				results.push({ success: false, account, error });
				return importAccountsSequentially(index + 1, results);
			});
	};

	return importAccountsSequentially();
};

export default mutateImportAccounts;
