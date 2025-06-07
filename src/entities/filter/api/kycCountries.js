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
		staleTime: 5 * 1000 * 60,
	});

export default useKycCountries;
