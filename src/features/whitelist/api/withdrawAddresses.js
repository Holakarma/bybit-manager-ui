import { useMutation } from '@tanstack/react-query';
import { Api, ENDPOINTS } from 'shared/api';

const getWithdrawAddresses = ({ database_id, signal, coinSymbol }) => {
	const api = new Api();
	return api.Get(ENDPOINTS.withdraw_addresses, {
		signal,
		params: { database_id, coin_symbol: coinSymbol },
	});
};

const useWithdrawAddresses = () =>
	useMutation({
		mutationFn: ({ database_id, signal, coinSymbol }) =>
			getWithdrawAddresses({ database_id, signal, coinSymbol }),
		mutationKey: ['withdraw addresses'],
	});

export default useWithdrawAddresses;
