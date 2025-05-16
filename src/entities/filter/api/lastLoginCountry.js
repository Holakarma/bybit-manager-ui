import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api/index';

const lastLoginCountry = () => {
	const api = new Api();

	return api.Get(ENDPOINTS.last_login_country);
};

const useLastLoginCountry = () =>
	useQuery({
		queryFn: lastLoginCountry,
		queryKey: ['last-login-country'],
	});

export default useLastLoginCountry;
