import { defaultConfig as defaultApiConfig } from 'shared/api';
import { RECAPTCHA_TYPE } from 'shared/model/app-config';
import {
	API_CONFIG_NAME,
	TASK_SETTINGS_CONFIG_NAME,
	VERIFY_ATTEMPTS_CONFIG_NAME,
} from 'shared/model/app-config/consts';
import * as yup from 'yup';
import taskSettingsDefaultConfig from './taskSettingsDefaultConfig';

const schema = yup.object({
	[API_CONFIG_NAME]: yup.object({
		host: yup.string().required('Host is required'),
		port: yup
			.number()
			.typeError('Port must be a number')
			.min(0, 'Port must be between 0 and 65535')
			.max(65535, 'Port must be between 0 and 65535')
			.required('Port is required'),
	}),
	captchaType: yup
		.string()
		.oneOf(['recaptcha', 'gee4captcha'])
		.required('Captcha type is required'),
	[VERIFY_ATTEMPTS_CONFIG_NAME]: yup.object({
		email: yup
			.number()
			.min(1, 'Email attempts must be at least 1')
			.required('Email attempts are required'),
		totp: yup
			.number()
			.min(1, 'TOTP attempts must be at least 1')
			.required('TOTP attempts are required'),
	}),
	[TASK_SETTINGS_CONFIG_NAME]: yup.object({
		threads: yup
			.number()
			.integer('Threads must be an integer')
			.min(1, 'Threads must be >= 1')
			.required('Threads are required'),
		delay: yup.object({
			enabled: yup.boolean().required('Delay enabled is required'),
			min: yup
				.number()
				.positive('Must be > 0')
				.required('Delay min is required'),
			max: yup
				.number()
				.test('delay-max-gte-min', 'Must be >= min', function (value) {
					const min = this.parent.min;
					return value >= min;
				})
				.required('Delay max is required'),
		}),
		shuffle: yup.boolean().required('Shuffle is required'),
		prelogin: yup.boolean().required('Prelogin is required'),
	}),
});

export const defaultConfig = {
	[API_CONFIG_NAME]: defaultApiConfig,
	captchaType: RECAPTCHA_TYPE,
	[VERIFY_ATTEMPTS_CONFIG_NAME]: {
		email: 3,
		totp: 3,
	},
	[TASK_SETTINGS_CONFIG_NAME]: taskSettingsDefaultConfig,
};

export default schema;
