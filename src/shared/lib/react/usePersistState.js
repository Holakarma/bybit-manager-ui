import { useEffect, useState } from 'react';

const usePersistState = (key, defaultReturned) => {
	if (!key) {
		throw Error('key is required to persist state');
	}

	const [persistState, usePersistState] = useState(() => {
		try {
			const savedWidths = localStorage.getItem(key);
			return savedWidths ? JSON.parse(savedWidths) : defaultReturned;
		} catch (_e) {
			return defaultReturned;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(persistState));
	}, [persistState, key]);

	return [persistState, usePersistState];
};

export default usePersistState;
