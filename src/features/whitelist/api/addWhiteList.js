import { useMutation } from '@tanstack/react-query';
import { useTask } from 'entities/task';
import { useSnackbar } from 'notistack';

import { useAccount, useRiskToken } from 'entities/account';
import { useLogs } from 'entities/log';
// eslint-disable-next-line no-restricted-imports
import { useEnable2faMutation } from 'features/enable-2fa/api/enable2fa';
import { SENCE, useVerifyRiskToken } from 'features/login';
// eslint-disable-next-line no-restricted-imports
import { usePreloginAttempt } from 'features/login/@X/pre-login';
import useAddWithdrawAddress from './addWithdrawAddress';
import useEnableWhitelist from './enableWhitelist';
import useWithdrawAddresses from './withdrawAddresses';

const useAddWithdrawAddressAccount = () => {
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const enableTotpMutaiton = useEnable2faMutation();
	const preloginMutaiton = usePreloginAttempt();
	const withdrawAddressesMutation = useWithdrawAddresses();
	const accountMutatin = useAccount();
	const enableWhitelistMutation = useEnableWhitelist();
	const riskTokenMutation = useRiskToken();
	const vetifyRiskTokenMutation = useVerifyRiskToken();
	const addWithdrawAddressMutation = useAddWithdrawAddress();

	const mutationFn = async ({ database_id, signal, taskId, settings }) => {
		try {
			await preloginMutaiton.mutateAsync({
				database_id,
				signal,
				taskId,
				settings,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		let account = await accountMutatin.mutateAsync(database_id);

		if (account.totp_enabled === false) {
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
			} else {
				addErrorLog({
					error: new Error('2fa is not enabled, skip account'),
					group: taskId,
					database_id,
				});
				return;
			}
		}

		if (account.withdraw_whitelist_enabled === null) {
			try {
				await withdrawAddressesMutation.mutateAsync({
					database_id,
					signal,
					coinSymbol: settings.coin,
				});
				account = await accountMutatin.mutateAsync(database_id);
			} catch (error) {
				addErrorLog({ error, group: taskId, database_id });
				return;
			}
		}

		if (account.withdraw_whitelist_enabled === false) {
			if (!settings.enable_whitelist) {
				addErrorLog({
					error: new Error('Whitelist is not enabled, skip account'),
					group: taskId,
					database_id,
				});
				return;
			} else {
				let verifiedRiskToken;
				try {
					const {
						risk_token: riskToken,
						risk_token_type: riskTokenType,
					} = await vetifyRiskTokenMutation.mutateAsync({
						database_id,
						signal,
						sence: SENCE.ENABLE_WITHDRAW_WHITELIST,
					});

					await vetifyRiskTokenMutation.mutateAsync({
						database_id,
						signal,
						riskToken,
						riskTokenType,
					});
					verifiedRiskToken = riskToken;
				} catch (error) {
					addErrorLog({ error, group: taskId, database_id });
					return;
				}

				addInfoLog({
					message: 'try to enable whitelist',
					group: taskId,
					database_id,
				});

				try {
					await enableWhitelistMutation.mutateAsync({
						database_id,
						signal,
						verifiedRiskToken,
					});
				} catch (error) {
					addErrorLog({ error, group: taskId, database_id });
					return;
				}
			}
		}

		const addressData = {
			coin: settings.universal ? 'baseCoin' : settings.coin,
			address: settings.addresses[database_id],
			chain_type: settings.chain_type,
			remark: settings.remark,
			is_verified: settings.verify,
			address_type: 0,
		};

		if (settings.memo) {
			addressData['memo'] = settings.memo;
		}

		if (settings.internalAddressType) {
			addressData['internal_address_type'] = settings.internalAddressType;
		}

		let verifiedRiskToken;

		try {
			const extInfo = { addresses: [addressData] };
			const { risk_token: riskToken, risk_token_type: riskTokenType } =
				await riskTokenMutation.mutateAsync({
					database_id,
					signal,
					sence: SENCE.ADD_WITHDRAW_ADDRESS,
					extInfo,
				});
			await vetifyRiskTokenMutation.mutateAsync({
				database_id,
				signal,
				riskToken,
				riskTokenType,
			});
			verifiedRiskToken = riskToken;
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			message: 'try to add withdraw address',
			group: taskId,
			database_id,
		});

		try {
			await addWithdrawAddressMutation.mutateAsync({
				database_id,
				signal,
				...addressData,
				set_as_default: settings.setAsDefault,
				verified_risk_token: verifiedRiskToken,
			});
		} catch (error) {
			if (error.bybit_response?.ret_code === 32040) {
				addSuccessLog({
					message: 'withdraw address already exists',
					group: taskId,
					database_id,
				});
				return;
			}
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'withdraw address added to whitelist',
			group: taskId,
			database_id,
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['add-whitelist'],
	});
};

const useAddWithdrawAddressesTask = () => {
	const { enqueueSnackbar } = useSnackbar();

	const mutation = useAddWithdrawAddressAccount();

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
		onAccountProcessed: processedAccountHandler,
		type: 'withdraw-whitelist',
	});
};

export default useAddWithdrawAddressesTask;
