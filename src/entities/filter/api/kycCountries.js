import { useQuery } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api/index';

const getKycCountries = () => {
	const api = new Api();

	return api.Get(ENDPOINTS.kyc_countries);
};

const useKycCountries = () =>
	useQuery({
		queryFn: getKycCountries,
		queryKey: ['kyc-countries'],
	});

export default useKycCountries;
