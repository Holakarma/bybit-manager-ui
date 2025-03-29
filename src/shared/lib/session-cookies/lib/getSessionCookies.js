const getSessionCookies = (cookies, cookieName = 'secure-token') => {
	return cookies?.filter((cookie) => cookie.name === cookieName);
};

export default getSessionCookies;
