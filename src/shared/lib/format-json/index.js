export const formatJson = (json) => {
	try {
		const parsedJson = typeof json === 'string' ? JSON.parse(json) : json;

		return JSON.stringify(parsedJson, null, 2);
	} catch (error) {
		console.error('Invalid JSON:', error);
		return '';
	}
};
