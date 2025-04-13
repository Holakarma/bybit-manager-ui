import { API_CONFIG_NAME, APP_CONFIG_NAME } from './consts';

const getApiConfig = () => {
	try {
		return JSON.parse(localStorage.getItem(APP_CONFIG_NAME))[
			API_CONFIG_NAME
		];
	} catch (e) {
		throw Error('Failed to get api config: ', e.message);
	}
};

export default getApiConfig;
