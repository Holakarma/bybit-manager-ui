import { APP_CONFIG_NAME, TASK_SETTINGS_CONFIG_NAME } from './consts';

const getTaskSettingsConfig = (defaultConfig) => {
	try {
		return JSON.parse(localStorage.getItem(APP_CONFIG_NAME))[
			TASK_SETTINGS_CONFIG_NAME
		];
	} catch (e) {
		console.error('Failed to get api config: ', e.message);
		return defaultConfig;
	}
};

export default getTaskSettingsConfig;
