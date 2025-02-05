import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useAccountsBase = create((set) => ({
	accounts: [
		{
			bybit_email: 'first_acc@firstmail.com',
			imap_password: '12dsSq3fh&k',
			imap_address: '',
			bybit_password: '',
			bybit_proxy: '',
			email_proxy: '',
		},
	],
	setAccounts: (newAccounts) => set({ accounts: newAccounts }),
	addAccount: (newAccount) =>
		set((state) => {
			return {
				...state,
				groups: [...state.groups, newAccount],
			};
		}),
}));

const useAccounts = createSelectors(useAccountsBase);
export default useAccounts;
