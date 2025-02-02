import { useMutation } from '@tanstack/react-query';
import updateAccount from '../api/updateAccount';

const useUpdateAccountMutation = () =>
	useMutation({
		mutationFn: (updatingAccount) =>
			new Promise((resolve, reject) =>
				updateAccount(updatingAccount)
					.then((result) => {
						resolve(result);
					})
					.catch(reject),
			),
		mutationKey: ['update-account'],
	});

export default useUpdateAccountMutation;
