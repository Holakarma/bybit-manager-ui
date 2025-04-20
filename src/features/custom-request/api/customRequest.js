import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomRequests } from 'entities/custom-request';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const customRequest = (database_id, signal, request) => {
	const api = new Api();
	return api.Post(ENDPOINTS.custom_request, request, {
		signal,
		params: { database_id },
	});
};

export const useCustomRequestMutation = (request) => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['custom request', database_id],
			requestFn: async () => {
				const result = await customRequest(
					database_id,
					signal,
					request,
				);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['custom request'],
	});
};

const useCustomRequestTask = (requestId) => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const requests = useCustomRequests();
	const request = requests.data?.find((r) => r.id === requestId);

	const successHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
	};

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Processing...');
	};
	const mutation = useCustomRequestMutation(request);
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({ database_id, signal, taskId }) => {
		addInfoLog({
			message: `completing ${request.title}`,
			group: taskId,
			database_id,
		});

		try {
			await mutation.mutateAsync({ database_id, signal });
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: `${request.title} completed`,
			group: taskId,
			database_id,
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSuccess: successHandler,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'custom request',
	});
};

export default useCustomRequestTask;
