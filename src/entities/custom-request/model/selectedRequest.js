import { uniqueId } from 'shared/lib/generateUniqueId';
import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

export const defaultParam = () => ({
	key: '',
	value: '',
	active: true,
	id: uniqueId(),
});

export const defaultCustomRequest = () => ({
	method: 'GET',
	path: '',
	json: '{}',
	data: '',
	params: [defaultParam()],
	headers: [defaultParam()],
	cookies: [defaultParam()],
	bodyType: 'JSON',
	title: 'New request',
	id: uniqueId(),
});

const useSelectedRequestBase = create((set) => ({
	request: null,

	setRequest: (request) => set({ request }),
	// duplicateRequest: (request) =>
	// 	set((state) => {
	// 		const newRequest = 0;
	// 	}),
	unsetRequest: () => set({ request: null }),
}));

const useSelectedRequest = createSelectors(useSelectedRequestBase);
export default useSelectedRequest;
