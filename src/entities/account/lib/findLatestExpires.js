const findLatestExpires = (cookies) => {
	if (!Array.isArray(cookies) || cookies.length === 0) {
		return null; // Если массив пустой или не является массивом, возвращаем null
	}

	return cookies.reduce((latest, current) =>
		latest.expires > current.expires ? latest : current,
	);
};

export default findLatestExpires;
