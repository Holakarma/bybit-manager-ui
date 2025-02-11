import { useMutation } from '@tanstack/react-query';
import mutateImportAccounts from '../lib/mutateImportAccounts';

const useImportAccountsMutation = () =>
	useMutation({
		mutationFn: ({ form, onSuccess, onError }) =>
			mutateImportAccounts({ form, onSuccess, onError }),
	});

export default useImportAccountsMutation;
