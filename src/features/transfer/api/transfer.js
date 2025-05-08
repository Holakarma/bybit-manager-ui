import { useQueryClient } from '@tanstack/react-query';
import { FINANCE_ACCOUNT_TYPE_TITLE } from 'entities/finance-account';
import { useLogs } from 'entities/log';
import { useTask } from 'entities/task';
// eslint-disable-next-line no-restricted-imports
import { usePreloginAttempt } from 'features/login/@X/pre-login';
import { Api, ENDPOINTS } from 'shared/api';
import { useDeduplicateMutation } from 'shared/tanstack';

const transfer = ({
	database_id,
	signal,
	finance_account_type_from,
	finance_account_type_to,
	coin_symbol,
	max_amount: _,
}) => {
	const api = new Api();

	return api.Post(
		ENDPOINTS.transfer,
		{ coin_symbol },
		{
			signal,
			params: {
				database_id,
				finance_account_type_from,
				finance_account_type_to,
			},
		},
	);
};

const useTransferTask = () => {
	const queryClient = useQueryClient();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const preloginAttemptMutation = usePreloginAttempt();
	const mutation = useDeduplicateMutation({
		fn: transfer,
		keys: ['transfer'],
	});

	const mutationFunction = async ({
		database_id,
		signal,
		taskId,
		settings,
	}) => {
		addInfoLog({
			message: 'transfer started',
			group: taskId,
			database_id,
		});

		try {
			await preloginAttemptMutation.mutateAsync({
				database_id,
				signal,
				settings,
				taskId,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		for (const coin of settings.coinSymbols) {
			if (!coin.ids.includes(database_id)) {
				addInfoLog({
					message: `account has no ${coin.symbol} ${FINANCE_ACCOUNT_TYPE_TITLE[settings.from]} balance`,
					group: taskId,
					database_id,
				});
				return;
			}

			try {
				const result = await mutation.mutateAsync({
					database_id,
					signal,
					finance_account_type_from: settings.from,
					finance_account_type_to: settings.to,
					coin_symbol: coin.symbol,
				});

				addSuccessLog({
					message: `transferred ${result.result.transferred} ${coin.symbol} to ${FINANCE_ACCOUNT_TYPE_TITLE[settings.to]}`,
					group: taskId,
					database_id,
				});
			} catch (error) {
				addErrorLog({
					error: new Error(
						`did not transfer ${coin.symbol}: ${JSON.stringify(error)}`,
					),
					group: taskId,
					database_id,
				});
			}
		}
	};

	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['transfer-coins'],
		});
	};

	return useTask({
		asyncMutation: mutationFunction,
		onSettled: settleHandler,
		type: 'transfer',
	});
};

export default useTransferTask;
