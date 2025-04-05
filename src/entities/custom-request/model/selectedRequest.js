import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useSelectedRequestBase = create((set) => ({
	request: null,

	setRequest: (request) => set({ request }),
	unsetRequest: () => set({ request: null }),
}));

const useSelectedRequest = createSelectors(useSelectedRequestBase);
export default useSelectedRequest;
