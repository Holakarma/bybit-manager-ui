const findLatestExpires = (cookies) => {
	if (!Array.isArray(cookies) || cookies.length === 0) {
		return null;
	}

	return cookies.reduce((latest, current) =>
		latest.expires > current.expires ? latest : current,
	).expires;
};

export default findLatestExpires;
