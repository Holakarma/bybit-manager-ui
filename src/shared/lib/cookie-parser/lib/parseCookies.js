const parseCookies = (cookieString) => {
	const cookies = {};

	if (!cookieString) {
		return cookies;
	}

	const cookiePairs = cookieString.split(';');

	for (const pair of cookiePairs) {
		const [key, value] = pair.trim().split('=');

		if (key) {
			cookies[key] = value || '';
		}
	}

	return cookies;
};

export default parseCookies;
