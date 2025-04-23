import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRiskToken } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { SENCE, useVerifyRiskToken } from 'features/login';
// eslint-disable-next-line no-restricted-imports
import { useUpdateProfileMutation } from 'features/update-profile/api/updateProfile';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';

const disable2fa = ({ database_id, signal, riskToken }) => {
	const api = new Api();
	return api.Post(ENDPOINTS.disable_2fa, riskToken, {
		signal,
		params: { database_id },
	});
};

const useDisable2faMutationApi = () => {
	const mutationFunction = ({ database_id, signal, riskToken }) => {
		return deduplicateRequests({
			requestKey: ['disable2fa', database_id],
			requestFn: async () => {
				const result = await disable2fa({
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
		mutationKey: ['disable2fa'],
	});
};

export const useDisable2faMutation = () => {
	const disable2fa = useDisable2faMutationApi();
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

		if (profile?.result.totp_enabled === false) {
			addSuccessLog({
				message: '2fa already disabled',
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
				sence: SENCE.DISABLE_2FA,
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
			message: 'disabling totp',
			group: taskId,
			database_id,
		});

		try {
			await disable2fa.mutateAsync({ database_id, signal, riskToken });
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
			message: '2fa disabled',
			group: taskId,
			database_id,
		});
	};

	return useMutation({
		mutationFn,
		mutationKey: ['disable2fa'],
	});
};

const useDisable2faTask = () => {
	const queryClient = useQueryClient();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const successHandler = async () => {
		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});
	};

	// @TODO: account description is unused now
	const accountMutationHandler = (id, taskId) => {
		changeAccountDescription(taskId, id, 'Disabling 2fa...');
	};
	const mutation = useDisable2faMutation();

	return useTask({
		asyncMutation: mutation.mutateAsync,
		onSuccess: successHandler,
		onAccountMutation: accountMutationHandler,
		type: 'disable2fa',
	});
};

export default useDisable2faTask;
