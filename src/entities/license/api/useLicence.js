import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getLicense = () => {
	const api = new Api();

	return api.Get(ENDPOINTS.license);
};

const useLicense = () =>
	useQuery({
		queryFn: getLicense,
		queryKey: ['license'],
		retry: false,
	});

export default useLicense;
