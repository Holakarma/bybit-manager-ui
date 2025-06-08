import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultValues } from './schema';

const FILERSTORE_KEY = 'filters';

const useFilterBase = create(
	persist(
		(set) => ({
			search: '',
			groups: [],
			filter: defaultValues,
			setFilter: (filter) => set({ filter }),
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
