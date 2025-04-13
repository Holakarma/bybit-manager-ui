import { APP_CONFIG_NAME } from './consts';

const setAppConfig = (config) =>
	localStorage.setItem(APP_CONFIG_NAME, JSON.stringify(config));

export default setAppConfig;
