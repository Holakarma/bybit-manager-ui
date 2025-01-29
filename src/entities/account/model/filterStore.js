import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useSearchBase = create((set) => ({
	email: '',
	setEmail: (newEmail) => set({ email: newEmail }),
}));

const useSearch = createSelectors(useSearchBase);
export default useSearch;
