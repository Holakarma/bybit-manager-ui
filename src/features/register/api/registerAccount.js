import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	useAccount,
	useDefaultAccount,
	useUpdateAccountMutation,
} from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import useIsEmailExistMutation from './isEmailExist';

const registerAccount = async (database_id, signal) => {
	const api = new Api();
	return await api.Post(ENDPOINTS.register_account, null, {
		signal,
		params: { database_id },
	});
};

export const useRegisterAccountMutation = () => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['register', database_id],
			requestFn: async () => {
				const result = await registerAccount(database_id, signal);
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['register'],
	});
};

const useRegisterTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};

	const processedAccountHandler = ({ id, error }) => {
		if (error) {
			enqueueSnackbar(
				`${id} ${
					error.bybit_response?.ret_msg ||
					error.statusText ||
					'Some error occured'
				}`,
				{
					variant: 'error',
				},
			);
		}
	};

	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Signing up...');
	};

	const defaultAccount = useDefaultAccount.use.defaultAccountId();
	const updateAccountMutation = useUpdateAccountMutation();
	const accountMutation = useAccount();
	const testEmailMutation = useIsEmailExistMutation();
	const mutation = useRegisterAccountMutation();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({
		database_id,
		signal,
		taskId,
		settings,
	}) => {
		addInfoLog({
			message: 'try to sign up',
			group: taskId,
			database_id,
		});

		if (settings.test_email) {
			try {
				const account = await accountMutation.mutateAsync(database_id);

				addInfoLog({
					message: `checking the email ${account.email.address}`,
					group: taskId,
					database_id,
				});

				const isExist = await testEmailMutation.mutateAsync({
					database_id: defaultAccount,
					signal,
					email: account.email.address,
				});

				if (isExist.result) {
					addErrorLog({
						error: Error('email already exist'),
						group: taskId,
						database_id,
					});
					await updateAccountMutation.mutateAsync({
						id: database_id,
						registered: true,
					});
					return;
				}
			} catch (error) {
				addErrorLog({ error, group: taskId, database_id });
				return;
			}
		}

		addInfoLog({
			message: 'email is not exist, signing up',
			group: taskId,
			database_id,
		});

		return;

		try {
			await mutation.mutateAsync({ database_id, signal });
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'registered',
			group: taskId,
			database_id,
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		onAccountProcessed: processedAccountHandler,
		onAccountMutation: accountMutationHandler,
		type: 'register',
	});
};

export default useRegisterTask;
