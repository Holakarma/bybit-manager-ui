export class CustomRequestApiDTO {
	constructor(customRequest) {
		this.method = customRequest.method;
		this.path = customRequest.path;
		this.json = JSON.stringify(customRequest.json);
		this.data = customRequest.data;
		this.params = Object.fromEntries(
			Object.entries(customRequest.params).filter(
				([_, param]) => param.active,
			),
		);
		this.headers = {
			...Object.fromEntries(
				Object.entries(customRequest.headers)
					.filter(([_, param]) => param.active)
					.map(([header, { value }]) => [header, value]),
			),

			// @TODO: Переделать в отдельный параметр
			'Set-Cookie': Object.entries(customRequest.cookies)
				.filter(([_, cookie]) => cookie.active)
				.map(([key, cookie]) => `${key}=${cookie.value}`)
				.join('; '),
		};
	}
}
