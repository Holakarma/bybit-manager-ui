import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useFilter, useUpdateAccountMutation } from 'entities/account';

const computeMutation = (newRow, oldRow) => {
	if (newRow.name !== oldRow.name) {
		return `name`;
	}
	if (newRow.group_name !== oldRow.group_name) {
		return `group_name`;
	}
	return null;
};

const useUpdateRow = ({ onSuccess, onError }) => {
	const updateMutation = useUpdateAccountMutation();
	const queryClient = useQueryClient();
	const addGroup = useFilter.use.addGroup();

	const mutationFn = async ({ updatedRow, originalRow }) => {
		const mutation = computeMutation(updatedRow, originalRow);
		if (!mutation) return originalRow;

		const row = {
			id: originalRow.id,
			name: updatedRow.name || '',
			group_name: updatedRow.group_name || '',
		};

		await updateMutation.mutateAsync(row);
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['groups'],
		});
		addGroup(updatedRow.group_name || '');
		return updatedRow;
	};

	return useMutation({
		mutationFn,
		onSuccess,
		onError,
	});
};

export default useUpdateRow;
