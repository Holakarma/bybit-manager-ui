import { create } from 'zustand';

const useSearch = create((set) => ({
	email: '',
	setEmail: (newEmail) => set({ email: newEmail }),
}));

export default useSearch;
