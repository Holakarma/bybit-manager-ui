const getCookiesWithoutSession = (cookies) => {
	if (!cookies || !cookies.length) return;

	return cookies.filter((cookie) => cookie.name !== 'secure-token');
};

export default getCookiesWithoutSession;
