import findLatestExpires from './findLatestExpires';
import getSessionCookies from './getSessionCookies';

const getExpireFromAllCookies = (cookies, cookieName = 'secure-token') => {
	const sessionCookies = getSessionCookies(cookies, cookieName);

	if (!sessionCookies.length) return null;

	return findLatestExpires(sessionCookies);
};

export default getExpireFromAllCookies;
