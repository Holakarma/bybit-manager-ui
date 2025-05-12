import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FILERSTORE_KEY = 'filters';

const useFilterBase = create(
	persist(
		(set) => ({
			search: '',
			groups: [],
			setSearch: (newSearch) => set({ search: newSearch || '' }),
			setGroups: (newGroups) => set({ groups: newGroups || [] }),
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
		}),
		{ name: FILERSTORE_KEY },
	),
);

const useFilter = createSelectors(useFilterBase);
export default useFilter;
