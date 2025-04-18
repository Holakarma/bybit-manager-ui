import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

import { useLogs } from 'entities/log';
// eslint-disable-next-line no-restricted-imports
import { useLoginAccountMutation } from 'features/login/@X/pre-login';

const getFinanceAccounts = (database_id, signal) => {
	const api = new Api();

	const url = ENDPOINTS.finance_accounts;

	return new Promise((resolve, reject) => {
		api.Get(url, {
			params: { database_id, ['quote_coin_symbol']: 'BTC' },
			signal,
		})
			.then((response) => {
				return resolve({ database_id, ...response });
			})
			.catch((error) => {
				return reject({ database_id, ...error });
			});
	});
};

const useRefreshFinancesAccounts = (props) => {
	const mutationFunction = ({ database_id, signal }) => {
		return deduplicateRequests({
			requestKey: ['refresh finance accounts', database_id],
			requestFn: async () => {
				const result = await getFinanceAccounts(database_id, signal);
				return { ...result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['refresh finance accounts'],
		...props,
	});
};

const useRefreshTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const loginMutation = useLoginAccountMutation();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const mutation = useRefreshFinancesAccounts({
		onMutate: (variables) =>
			/* Prelogin */
			new Promise((resolve, reject) => {
				changeAccountDescription(
					variables.taskId,
					variables.database_id,
					'Logging in...',
				);
				if (variables.settings.prelogin) {
					loginMutation
						.mutateAsync(variables)
						.then((result) => {
							resolve(result);
						})
						.catch((error) => {
							reject(error);
						});
				} else {
					resolve();
				}
			}),
	});
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
			message: 'start refresh balance',
			group: taskId,
			database_id,
		});

		try {
			await mutation.mutateAsync({
				database_id,
				signal,
				settings,
				taskId,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'balance refreshed',
			group: taskId,
			database_id,
		});
	};

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['finance accounts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
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
		changeAccountDescription(taskId, id, 'Refreshing...');
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		onAccountProcessed: processedAccountHandler,
		onAccountMutation: accountMutationHandler,
		type: 'finance accounts',
	});
};

export default useRefreshTask;
