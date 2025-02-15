import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';
import isAccountEmpty from '../lib/isAccountEmpty';
import { createAccountObject, createEmptyObject } from './accountObj';

const useAccountsBase = create((set) => ({
	accounts: [createEmptyObject()],
	setAccounts: (newAccounts) =>
		set({
			accounts: [
				...newAccounts.map((newAccount) =>
					createAccountObject(newAccount),
				),
				createEmptyObject(),
			],
		}),
	addAccount: (newAccount) =>
		set((state) => ({
			accounts: [
				...state.accounts.slice(0, -1),
				createAccountObject(newAccount),
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
	deleteAccount: (id) =>
		set((state) => ({
			accounts: [...state.accounts].filter(
				(account) => account.id !== id,
			),
		})),
}));

const useAccounts = createSelectors(useAccountsBase);
export default useAccounts;
