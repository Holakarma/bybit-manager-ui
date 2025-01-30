import axios from 'axios';

class Api {
	Get = (url, params, headers) =>
		new Promise((resolve, reject) =>
			axios
				.get(url, {
					headers,
					params,
				})
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error);
				}),
		);

	Post = (url, params, headers) =>
		new Promise((resolve, reject) =>
			axios
				.post(url, params, headers)
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error);
				}),
		);

	Patch = (url, params, headers) =>
		new Promise((resolve, reject) =>
			axios
				.patch(url, params, headers)
				.then((response) => {
					return resolve(response.data);
				})
				.catch((error) => {
					return reject(error);
				}),
		);

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
