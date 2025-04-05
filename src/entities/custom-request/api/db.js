import { CUSTOM_REQUESTS_STORE, Database } from 'shared/api';

class CustomRequestsDatabase extends Database {
	async addCustomRequest(customRequest) {
		return await this.addRow(CUSTOM_REQUESTS_STORE, customRequest);
	}

	async getCustomRequests(filter) {
		return await this.getRows(CUSTOM_REQUESTS_STORE, filter);
	}

	async clearCustomRequests() {
		return await this.clearRows(CUSTOM_REQUESTS_STORE);
	}

	async deleteCustomRequest(id) {
		return await this.deleteRow(CUSTOM_REQUESTS_STORE, id);
	}

	async updateCustomRequest(id, newCustomRequestData) {
		return await this.updateRow(
			CUSTOM_REQUESTS_STORE,
			id,
			newCustomRequestData,
		);
	}
}

export const customRequestsDB = new CustomRequestsDatabase();
