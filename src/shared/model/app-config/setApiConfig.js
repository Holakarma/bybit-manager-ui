import { API_CONFIG_NAME, APP_CONFIG_NAME } from './consts';

const setApiConfig = (apiConfig) => {
	const appConfig = JSON.parse(localStorage.getItem(APP_CONFIG_NAME));
	localStorage.setItem(
		APP_CONFIG_NAME,
		JSON.stringify({ appConfig, [API_CONFIG_NAME]: apiConfig }),
	);
};

export default setApiConfig;
