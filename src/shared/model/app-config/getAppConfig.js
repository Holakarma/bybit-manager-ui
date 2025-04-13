import { APP_CONFIG_NAME } from './consts';

const getAppConfig = () => {
	try {
		return JSON.parse(localStorage.getItem(APP_CONFIG_NAME));
	} catch (e) {
		throw Error('Failed to get app config: ', e.message);
	}
};

export default getAppConfig;
