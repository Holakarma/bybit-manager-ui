import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLogs } from 'entities/log';
import { useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
// eslint-disable-next-line no-restricted-imports
import { usePreloginAttempt } from 'features/login/@X/pre-login';

const getDepositAddress = ({
	database_id,
	signal,
	coin_symbol,
	chain_name,
}) => {
	const api = new Api();

	const url = ENDPOINTS.deposit_address;

	return new Promise((resolve, reject) => {
		api.Get(url, {
			params: { database_id, coin_symbol, chain_name },
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

const useRefreshDepositAddress = (props) => {
	const queryClient = useQueryClient();

	const mutationFunction = (params) => {
		return deduplicateRequests({
			requestKey: ['refresh deposit address', params.database_id],
			requestFn: async () => {
				const result = await getDepositAddress(params);
				return { ...result, database_id: params.database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['refresh deposit address'],
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: [ENDPOINTS.db_deposit_addresess],
			}),
		...props,
	});
};

const useRefreshTask = () => {
	const { enqueueSnackbar } = useSnackbar();
	const preloginMutation = usePreloginAttempt();

	const mutation = useRefreshDepositAddress();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();

	const mutationFunction = async ({
		database_id,
		signal,
		taskId,
		settings,
	}) => {
		try {
			await preloginMutation.mutateAsync({
				database_id,
				signal,
				settings,
				taskId,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			message: 'start refresh deposit address',
			group: taskId,
			database_id,
		});

		try {
			await mutation.mutateAsync({
				coin_symbol: settings.coin.symbol,
				chain_name: settings.chain.name,
				database_id,
				signal,
				taskId,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'address refreshed',
			group: taskId,
			database_id,
		});
		return;
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
		asyncMutation: mutationFunction,
		onAccountProcessed: processedAccountHandler,
		type: 'finance accounts',
	});
};

export default useRefreshTask;
