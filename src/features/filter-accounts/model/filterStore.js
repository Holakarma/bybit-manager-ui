import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useFilterBase = create((set) => ({
	email: '',
	group: '',
	setEmail: (newEmail) => set({ email: newEmail }),
	setGroup: (newGroup) => set({ group: newGroup }),
}));

const useFilter = createSelectors(useFilterBase);
export default useFilter;
