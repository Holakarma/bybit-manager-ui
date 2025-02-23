import axios from 'axios';

class Api {
	Get = ({ url, params, query, config }) =>
		new Promise((resolve, reject) => {
			let urlWithQuery = url;
			if (query) {
				const queryString = new URLSearchParams(query).toString();
				urlWithQuery = `${url}?${queryString}`;
			}

			axios
				.get(urlWithQuery, {
					config,
					params,
				})
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error.response);
				});
		});

	Post = ({ url, params, query, config }) =>
		new Promise((resolve, reject) => {
			let urlWithQuery = url;
			if (query) {
				const queryString = new URLSearchParams(query).toString();
				urlWithQuery = `${url}?${queryString}`;
			}

			axios
				.post(urlWithQuery, params, config)
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response);
				});
		});

	AllPages = ({ request, url, params, query, config }) =>
		new Promise((resolve, reject) => {
			let allResults = [];
			const queryParams = Object.assign({ page: 1, offset: 1 }, query);
			let urlWithQuery = url;
			const queryString = new URLSearchParams(queryParams).toString();
			urlWithQuery = `${url}?${queryString}`;

			request({ url: urlWithQuery, params, config })
				.then((result) => {
					allResults = [...allResults, ...result.result];
					if (!result.next_page) {
						resolve(allResults);
					} else {
						this.AllPages({
							request,
							url,
							params,
							query: {
								...query,
								page: result.next_page,
								offset: queryParams.offset,
							},
							config,
						}).then((nextPageData) => {
							resolve([...allResults, ...nextPageData]);
						});
					}
				})
				.catch((error) => reject(error));
		});

	Patch = ({ url, params, query, config }) =>
		new Promise((resolve, reject) => {
			let urlWithQuery = url;
			if (query) {
				const queryString = new URLSearchParams(query).toString();
				urlWithQuery = `${url}?${queryString}`;
			}

			axios
				.patch(urlWithQuery, params, config)
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error.response);
				});
		});

	// GetBlob = async (url, params, headers) => {
	// 	try {
	// 		const response = await axios.get(url, {
	// 			headers: {
	// 				...headers,
	// 			},
	// 			responseType: 'arraybuffer',
	// 			...params,
	// 		});

	// 		return new Blob([response.data], {
	// 			type:
	// 				response.headers['content-type'] ||
	// 				'application/octet-stream',
	// 		});
	// 	} catch (e) {
	// 		throw Error(e?.response?.data?.error || e);
	// 	}
	// };
}

export default Api;
