import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ACCOUNTSTORE_KEY = 'selectedAccounts';

const useSelectedAccountsIdBase = create(
	persist(
		(set) => ({
			selectedAccountsId: [],
			setSelectedAccountsId: (selectedAccountsId) => {
				set({ selectedAccountsId });
			},
			clearStorage: () => {
				set({ selectedAccounts: [] });
				window.localStorage.removeItem(ACCOUNTSTORE_KEY);
			},
		}),
		{ name: ACCOUNTSTORE_KEY },
	),
);

const useSelectedAccountsId = createSelectors(useSelectedAccountsIdBase);
export default useSelectedAccountsId;
