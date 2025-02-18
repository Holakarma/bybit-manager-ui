export const setColumnVisibilityModel = (newVisibility) => {
	localStorage.setItem('visibilityModel', JSON.stringify(newVisibility));
};

export const getVisibilityModel = () => {
	const model = localStorage.getItem('visibilityModel');
	if (model) {
		try {
			return JSON.parse(model);
		} catch (e) {
			console.error('Error while getting visibility model: ', e);
		}
	}
	return null;
};
