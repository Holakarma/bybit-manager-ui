import getExpireFromAllCookies from './getExpireFromAllCookies';

const isCookieAlive = (cookies) => {
	const expire = getExpireFromAllCookies(cookies);
	return expire && expire * 1000 > Date.now();
};

export default isCookieAlive;
