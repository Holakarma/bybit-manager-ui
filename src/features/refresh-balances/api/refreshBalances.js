import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskDB, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

// eslint-disable-next-line no-restricted-imports
import { useLoginAccountMutation } from 'features/login/@X/refresh-balances';

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

	const mutation = useRefreshFinancesAccounts({
		onMutate: (variables) =>
			/* Prelogin */
			new Promise((resolve, reject) => {
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

	const successHandler = async ({ data: accounts, taskId }) => {
		await taskDB.addTask({
			type: 'finance accounts',
			status: 'completed',
			data: accounts,
			taskId,
			startedAt: Date.now(),
		});

		enqueueSnackbar('Refresh completed', {
			variant: 'info',
		});

		/* Error accounts handling */
		accounts.forEach((account) => {
			if (account.error) {
				enqueueSnackbar(
					`${account.id} ${
						account?.error?.bybit_response?.ret_msg ||
						'Some error occured'
					}`,
					{
						variant: 'error',
					},
				);
			}
		});
	};

	const errorHandler = (error) => {
		if (error.message === 'Aborted') {
			enqueueSnackbar('Task aborted', {
				variant: 'warning',
			});
		} else {
			enqueueSnackbar('Error occured: ' + error.message, {
				variant: 'error',
			});
		}
	};

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['finance accounts'],
		});
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		type: 'finance accounts',
	});
};

export default useRefreshTask;
