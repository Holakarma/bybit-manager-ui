const getAccountsById = (accounts, accountsId) =>
	accountsId.reduce((acc, id) => {
		const account = accounts.find((a) => a.database_id === id);
		if (account) {
			acc.push(account);
		}
		return acc;
	}, []);

export default getAccountsById;
