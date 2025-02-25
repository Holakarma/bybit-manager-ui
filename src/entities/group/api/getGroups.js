import { Api, ENDPOINTS } from 'shared/api';

const getGroups = () => {
	const api = new Api();

	return api.Get(ENDPOINTS.groups);
};

export default getGroups;
