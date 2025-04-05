import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customRequestsDB } from './db';

const useUpdateCustomRequest = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ id, newCustomRequestData }) =>
			await customRequestsDB.updateCustomRequest(
				id,
				newCustomRequestData,
			),
		mutationKey: ['update-custom-request'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['custom-requests'] });
		},
	});
};
export default useUpdateCustomRequest;
