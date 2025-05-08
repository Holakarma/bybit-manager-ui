import { useMutation } from '@tanstack/react-query';
import { deduplicateRequests } from 'shared/api';

const useDeduplicateMutation = ({
	fn,
	params = {},
	keys,
	mutationParams = {},
}) => {
	const mutationFunction = ({ database_id, ...props }) => {
		return deduplicateRequests({
			requestKey: [...keys, database_id],
			requestFn: async () => {
				const result = await fn({
					...props,
					database_id,
					...params,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: keys,
		...mutationParams,
	});
};

export default useDeduplicateMutation;
