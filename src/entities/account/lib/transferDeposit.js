import { useMutation } from '@tanstack/react-query';

const useTransferDeposit = (accounts) => {
	const mutationFn = async (depositAddresses) => {
		return accounts.map((a) =>
			transferDepositAccount(a, depositAddresses[a.uid]),
		);
	};

	return useMutation({
		mutationFn,
		mutationKey: ['transfer deposit'],
	});
};

const transferDepositAccount = (account, addresses) => {
	return {
		id: account.database_id,
		name: account.name,
		group_name: account.group_name,
		email: account.email.address,
		address: addresses?.address,
		memo: addresses?.memo,
		remark: addresses?.remark,
		created_at: addresses?.created_at,
	};
};

export default useTransferDeposit;
