import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const ACCOUNTSTORE_KEY = 'defaultAccount';

const useDefaultAccountBase = create(
	persist(
		(set) => ({
			defaultAccountId: null,
			setDefaultAccountId: (defaultAccountId) =>
				set({ defaultAccountId }),
			clearStorage: () => {
				set({ defaultAccountId: null });
				window.localStorage.removeItem(ACCOUNTSTORE_KEY); // Удаляем данные по ключу
			},
		}),
		{ name: ACCOUNTSTORE_KEY },
	),
);

const useDefaultAccount = createSelectors(useDefaultAccountBase);
export default useDefaultAccount;
