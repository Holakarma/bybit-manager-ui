import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const addWithdrawAddress = ({
	database_id,
	signal,
	address,
	coin,
	chain_type,
	verified_risk_token,
	remark,
	verify,
	memo,
	internal_address_type,
	set_as_default,
}) => {
	const api = new Api();

	const body = {
		address,
		coin_symbol: coin || 'baseCoin', // || universal address
		chain_type,
		verified_risk_token,
		remark,
		verified: verify,
		set_as_default,
	};

	if (memo) {
		body.memo = memo;
	}

	if (internal_address_type) {
		body.internal_address_type = internal_address_type;
	}

	return api.Post(ENDPOINTS.add_withdraw_address, body, {
		signal,
		params: { database_id },
	});
};

const useAddWithdrawAddress = () => {
	const mutationFn = (requstOptions) =>
		deduplicateRequests({
			requestKey: ['add withdraw address'],
			requestFn: () => addWithdrawAddress(requstOptions),
		});

	return useMutation({
		mutationFn,
		mutationKey: ['add withdraw address'],
	});
};

export default useAddWithdrawAddress;
