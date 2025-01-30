import { useMutation } from '@tanstack/react-query';
import updateAccount from '../api/updateAccount';

const useUpdateAccountMutation = () =>
	useMutation({
		mutationFn: (updatingAccount) =>
			new Promise((resolve, reject) => {
				updateAccount(updatingAccount).then(resolve).catch(reject);
			}),
	});

export default useUpdateAccountMutation;
