import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useDepositCoinsChainsBase = create((set) => ({
	coin: null,
	chain: null,
	setCoin: (coin) => {
		set({ coin });
	},
	setChain: (chain) => {
		set({ chain });
	},
}));

const useDepositCoinChain = createSelectors(useDepositCoinsChainsBase);
export default useDepositCoinChain;
