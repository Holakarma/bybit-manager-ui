import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRiskToken } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { SENCE, useVerifyRiskToken } from 'features/login';
import { useUpdateProfileMutation } from 'features/update-profile/api/updateProfile';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const enable2fa = ({ database_id, signal, riskToken }) => {
	const api = new Api();
	return api.Post(ENDPOINTS.enable_2fa, riskToken, {
		signal,
		params: { database_id },
	});
};

export const useEnable2faApiMutation = () => {
	const mutationFunction = ({ database_id, signal, riskToken }) => {
		return deduplicateRequests({
			requestKey: ['enable2fa', database_id],
			requestFn: async () => {
				const result = await enable2fa({
					database_id,
					signal,
					riskToken,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['enable2faApi'],
	});
};

export const useEnable2faMutation = () => {
	const enable2fa = useEnable2faApiMutation();
	const addInfoLog = useLogs.use.addInfoLog();
	const addErrorLog = useLogs.use.addErrorLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const riskTokenMutation = useRiskToken();
	const veifyRiskTokenMutation = useVerifyRiskToken();
	const updateProfileMutation = useUpdateProfileMutation();

	const mutationFn = async ({ database_id, signal, taskId, settings }) => {
		let profile;

		try {
			profile = await updateProfileMutation.mutateAsync({
				database_id,
				signal,
				taskId,
				settings,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		if (profile?.result.totp_enabled === true) {
			addSuccessLog({
				message: '2fa already enabled',
				group: taskId,
				database_id,
			});
			return;
		}

		addInfoLog({
			message: 'get risk token',
			group: taskId,
			database_id,
		});

		let riskToken, riskTokenType;

		try {
			const result = await riskTokenMutation.mutateAsync({
				database_id,
				signal,
				sence: SENCE.ENABLE_2FA,
			});

			riskToken = result.risk_token;
			riskTokenType = result.risk_token_type;
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			message: 'verify risk token',
			group: taskId,
			database_id,
		});

		try {
			await veifyRiskTokenMutation.mutateAsync({
				database_id,
				signal,
				riskToken,
				riskTokenType,
				taskId,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			message: 'enabling totp',
			group: taskId,
			database_id,
		});

		try {
			await enable2fa.mutateAsync({ database_id, signal, riskToken });
		} catch (error) {
			addInfoLog({
				message: 'updating profile',
				group: taskId,
				database_id,
			});

			await updateProfileMutation.mutateAsync({
				database_id,
				signal,
				taskId,
				settings,
			});

			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			message: 'updating profile',
			group: taskId,
			database_id,
		});

		await updateProfileMutation.mutateAsync({
			database_id,
			signal,
			taskId,
			settings,
		});

		addSuccessLog({
			message: '2fa enabled',
			group: taskId,
			database_id,
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['enable2fa'],
	});
};

const useEnable2faTask = () => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();
	const settleHandler = () => {
		queryClient.invalidateQueries({
			queryKey: ['accounts'],
		});
	};
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Enabling 2fa...');
	};
	const mutation = useEnable2faMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSettled: settleHandler,
		onAccountMutation: accountMutationHandler,
		type: 'enable2fa',
	});
};

export default useEnable2faTask;
