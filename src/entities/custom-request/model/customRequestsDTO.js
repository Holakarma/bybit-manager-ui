import { parseParams } from 'shared/lib/param-parser';

class CustomRequestDTO {
	constructor(customRequest) {
		this.method = customRequest.method;
		this.title = customRequest.title;
		this.path = customRequest.path;
		this.params = parseParams(customRequest.params);
		this.json = customRequest.json ? JSON.parse(customRequest.json) : {};
		this.data = customRequest.data;
		this.bodyType = customRequest.bodyType;
		this.id = customRequest.id;
	}
}

export default CustomRequestDTO;
