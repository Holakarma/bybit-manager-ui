import getAppConfig from './getAppConfig';

export const RECAPTCHA_TYPE = 'recaptcha';
export const GEE4CAPTCHA_TYPE = 'gee4captcha';

const getCaptchaType = () => {
	try {
		const config = getAppConfig();

		return config.captchaType || RECAPTCHA_TYPE;
	} catch (_e) {
		return RECAPTCHA_TYPE;
	}
};

export default getCaptchaType;
