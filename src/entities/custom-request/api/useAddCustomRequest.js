import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customRequestsDB } from './db';

const useAddCustomRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newCustomRequest) =>
			await customRequestsDB.addCustomRequest(newCustomRequest),
		mutationKey: ['add-custom-request'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['custom-requests'] });
		},
	});
};
export default useAddCustomRequest;
