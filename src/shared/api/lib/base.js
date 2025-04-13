import axios from 'axios';
import { getApiConfig } from 'shared/model/app-config';

export const defaultConfig = {
	host: 'http://localhost',
	port: '8000',
};

const config = () => {
	try {
		return getApiConfig();
	} catch (_e) {
		return defaultConfig;
	}
};

const instance = axios.create({
	baseURL: `${config().host || 'http://localhost'}:${config().port || '8000'}/`,
});

instance.interceptors.request.use((config) => {
	if (!config.url) {
		return config;
	}

	const currentUrl = new URL(config.url, config.baseURL);

	Object.entries(config.urlParams || {}).forEach(([k, v]) => {
		currentUrl.pathname = currentUrl.pathname.replace(
			`:${k}`,
			encodeURIComponent(v),
		);
	});

	const authPart =
		currentUrl.username && currentUrl.password
			? `${currentUrl.username}:${currentUrl.password}`
			: '';
	return {
		...config,
		baseURL: `${currentUrl.protocol}//${authPart}${currentUrl.host}`,
		url: currentUrl.pathname,
	};
});

class Api {
	Get = (url, config = {}) =>
		new Promise((resolve, reject) => {
			instance
				.get(url, config)
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error.response?.data);
				});
		});

	Post = (url, body, config = {}) =>
		new Promise((resolve, reject) => {
			instance
				.post(url, body, config)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response?.data);
				});
		});

	GetAll = (url, config = {}) =>
		new Promise((resolve, reject) => {
			let allResults = [];

			const getPage = (pageConfig) => {
				this.Get(url, pageConfig)
					.then((response) => {
						allResults = allResults.concat(response.result);

						if (response.next_page) {
							getPage({
								...config,
								params: {
									...config.params,
									page: response.next_page,
									offset: response.offset || 50,
								},
							});
						} else {
							resolve(allResults);
						}
					})
					.catch((error) => {
						reject(error);
					});
			};

			getPage(config);
		});

	PostAll = (url, body, config = {}) =>
		new Promise((resolve, reject) => {
			let allResults = [];

			const postPage = (pageConfig) => {
				this.Post(url, body, pageConfig)
					.then((response) => {
						allResults = allResults.concat(response.result);

						if (response.next_page) {
							postPage({
								...config,
								params: {
									...config.params,
									page: response.next_page,
									offset: response.offset || 50,
								},
							});
						} else {
							resolve(allResults);
						}
					})
					.catch((error) => {
						reject(error);
					});
			};

			postPage(config);
		});

	Patch = (url, body, config) =>
		new Promise((resolve, reject) => {
			instance
				.patch(url, body, config)
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error.response?.data);
				});
		});
}

export default Api;
