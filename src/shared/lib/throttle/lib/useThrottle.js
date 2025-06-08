import { useCallback, useRef } from 'react';

const useThrottle = (callback, delay) => {
	const throttledRef = useRef(false);

	return useCallback(
		(...args) => {
			if (!throttledRef.current) {
				callback(...args);
				throttledRef.current = true;

				setTimeout(() => {
					throttledRef.current = false;
				}, delay);
			}
		},
		[callback, delay],
	);
};

export default useThrottle;
