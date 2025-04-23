import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

import { useLogs } from 'entities/log';
// eslint-disable-next-line no-restricted-imports
import { useAccount } from 'entities/account';
import { useEnable2faMutation } from 'features/enable-2fa/api/enable2fa';
import { useLoginAccountMutation } from 'features/login/api/loginAccount';
import useWithdrawAddresses from './withdrawAddresses';

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

const useAddWhiteListMutation = () => {
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const loginMutation = useLoginAccountMutation();
	const enableTotpMutaiton = useEnable2faMutation();
	const withdrawAddressesMutation = useWithdrawAddresses();
	const accountMutatin = useAccount();
	const getTask = usePendingTasks.use.getTask();
	const tasks = usePendingTasks.use.tasks();

	const mutationFn = async ({ database_id, signal, taskId, settings }) => {
		if (settings.prelogin) {
			try {
				await loginMutation.mutateAsync({
					database_id,
					signal,
					taskId,
				});
			} catch (error) {
				addErrorLog({ error, group: taskId, database_id });
				return;
			}
		}

		if (settings.enable_totp) {
			try {
				await enableTotpMutaiton.mutateAsync({
					database_id,
					signal,
					taskId,
				});
			} catch (error) {
				addErrorLog({ error, group: taskId, database_id });
				return;
			}
		}

		const account = await accountMutatin.mutateAsync(database_id);
		if (!account.totp_enabled) {
			addErrorLog({
				error: new Error('2fa is not enabled, skip account'),
				group: taskId,
				database_id,
			});
			return;
		}

		const task = getTask(taskId);

		// if (account.withdraw_whitelist_enabled === null) {
		// 	try {
		// 		await withdrawAddressesMutation.mutateAsync({
		// 			database_id,
		// 			signal,
		// 		});
		// 	} catch (error) {
		// 		addErrorLog({ error, group: taskId, database_id });
		// 		return;
		// 	}
		// }

		addSuccessLog({
			message: 'whitelist added',
			group: taskId,
			database_id,
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['add-whitelist'],
	});
};

const useAddWhitelistTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();

	const mutation = useAddWhiteListMutation();

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['finance accounts'],
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

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSettled: settleHandler,
		onAccountProcessed: processedAccountHandler,
		type: 'finance accounts',
	});
};

export default useAddWhitelistTask;
