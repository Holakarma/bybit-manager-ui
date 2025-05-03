const domain = 'https://api2.bybit.com';

const stringifyCurl = (requestObject) => {
	const {
		method = 'GET',
		path = '',
		params = {},
		headers = {},
		cookies = {},
		json = {},
		data = '',
		bodyType = 'JSON',
	} = requestObject;

	const baseUrl = `${domain}/${path}`;
	const url = new URL(baseUrl);

	Object.entries(params)
		.filter(([_, param]) => param.active)
		.forEach(([key, param]) => {
			url.searchParams.append(key, param.value);
		});

	let curlCommand = ['curl'];
	curlCommand.push(`-X ${method}`);

	Object.entries(headers)
		.filter(([_, header]) => header.active)
		.forEach(([key, header]) => {
			curlCommand.push(`-H "${key}: ${header.value}"`);
		});

	const activeCookies = Object.entries(cookies)
		.filter(([_, cookie]) => cookie.active)
		.map(([key, cookie]) => `${key}=${cookie.value}`)
		.join('; ');

	if (activeCookies) {
		curlCommand.push(`-b "${activeCookies}"`);
	}

	if (method !== 'GET' && method !== 'HEAD') {
		if (bodyType === 'JSON' && Object.keys(json).length > 0) {
			const jsonString = JSON.stringify(json);
			curlCommand.push(`-d '${jsonString}'`);
			curlCommand.push('-H "Content-Type: application/json"');
		} else if (bodyType === 'x-www-form-urlencoded' && data) {
			curlCommand.push(`-d '${data}'`);
			curlCommand.push(
				'-H "Content-Type: application/x-www-form-urlencoded"',
			);
		}
	}

	curlCommand.push(`"${url.toString()}"`);

	return curlCommand.join(' ');
};

export default stringifyCurl;
