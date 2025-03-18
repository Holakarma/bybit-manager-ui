import { createSelectors } from 'shared/zustand';
import { create } from 'zustand';

const useLayerBase = create((set) => ({
	layer: 'general',
	setLayer: (newLayer) => set({ layer: newLayer }),
}));

const useLayer = createSelectors(useLayerBase);
export default useLayer;
