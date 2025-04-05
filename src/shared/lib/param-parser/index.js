export const parseParams = (params) => {
	return params.reduce((acc, { key, value }) => {
		if (key.trim()) {
			acc[key] = value;
		}
		return acc;
	}, {});
};

export const exportParams = (params) =>
	Object.entries(params).map(([key, value]) => ({ key, value }));
