export const parseParams = (params) => {
	return params.reduce((acc, { key, value, active, id }) => {
		if (key.trim()) {
			acc[key] = { value, active, id };
		}
		return acc;
	}, {});
};

export const exportParams = (params) =>
	Object.entries(params).map(([key, value]) => ({ key, ...value }));
