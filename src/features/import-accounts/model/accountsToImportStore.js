import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const accountObj = {
	bybit_email: '',
	imap_password: '',
	imap_address: '',
	bybit_password: '',
	bybit_proxy: '',
	email_proxy: '',
};

// eslint-disable-next-line no-unused-vars
const isAccountEmpty = ({ id, ...account }) =>
	Object.values(account).every((value) => value === '');

const uniqueId = () => `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

const createEmptyObject = () => ({
	...accountObj,
	id: uniqueId(),
});

const useAccountsBase = create((set) => ({
	accounts: [
		...Array.from({ length: 20 }, () => ({
			id: uniqueId(),
			bybit_email: 'first_acc@firstmail.com',
			imap_password: '12dsSq3fh&k',
			imap_address: '',
			bybit_password: '',
			bybit_proxy: '',
			email_proxy: '',
		})),
		createEmptyObject(),
	],
	setAccounts: (newAccounts) => set({ accounts: newAccounts }),
	addAccount: (newAccount) =>
		set((state) => ({
			accounts: [
				...state.accounts.slice(0, -1),
				newAccount,
				createEmptyObject(),
			],
		})),
	editAccount: (index, updatedAccount) =>
		set((state) => {
			const accounts = [...state.accounts];
			const isEmpty = isAccountEmpty(updatedAccount);

			if (isEmpty && index < accounts.length - 1) {
				accounts.splice(index, 1);
			} else {
				accounts[index] = updatedAccount;

				if (index === accounts.length - 1 && !isEmpty) {
					accounts.push({ ...createEmptyObject() });
				}
			}

			return { accounts };
		}),
}));

const useAccounts = createSelectors(useAccountsBase);
export default useAccounts;
