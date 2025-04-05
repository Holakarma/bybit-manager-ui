import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customRequestsDB } from './db';

const useDeleteCustomRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id) =>
			await customRequestsDB.deleteCustomRequest(id),
		mutationKey: ['delete-custom-request'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['custom-requests'] });
		},
	});
};
export default useDeleteCustomRequest;
