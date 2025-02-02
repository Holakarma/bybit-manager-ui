import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useFilterBase = create((set) => ({
	email: '',
	groups: [],
	setEmail: (newEmail) => set({ email: newEmail }),
	setGroups: (newGroups) => set({ groups: newGroups }),
	addGroup: (newGroup) =>
		set((state) => {
			if (state.groups.includes(newGroup)) {
				return state;
			}

			return {
				...state,
				groups: [...state.groups, newGroup],
			};
		}),
}));

const useFilter = createSelectors(useFilterBase);
export default useFilter;
