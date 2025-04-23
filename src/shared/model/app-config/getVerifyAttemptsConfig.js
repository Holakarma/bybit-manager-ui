import { APP_CONFIG_NAME, VERIFY_ATTEMPTS_CONFIG_NAME } from './consts';

const getVerifyAttemptsConfig = () => {
	try {
		return JSON.parse(localStorage.getItem(APP_CONFIG_NAME))[
			VERIFY_ATTEMPTS_CONFIG_NAME
		];
	} catch (e) {
		console.error('Failed to get api config: ', e.message);
		return;
	}
};

export default getVerifyAttemptsConfig;
