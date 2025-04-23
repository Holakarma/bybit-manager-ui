import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { useLogs } from 'entities/log';
import { usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import { getExpireFromAllCookies } from 'shared/lib/session-cookies';
import SCENE from '../model/sceneEnum';
import useGetCaptcha from './getCaptcha';
import useLoginName from './getLoginName';
import usePermission from './getPermission';
import useLogin from './login';
import useSolveAndVerifyCaptcha from './solveAndVerifyCaptcha';
import useVerifyRiskToken from './verifyRiskToken';

export const useLoginAccountMutation = () => {
	const addErrorLog = useLogs.use.addErrorLog();
	const addInfoLog = useLogs.use.addInfoLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const permissionMutation = usePermission();
	const loginNameMutation = useLoginName();
	const getCaptchaMutation = useGetCaptcha();
	const solveAndVerifyCaptchaMutation = useSolveAndVerifyCaptcha();
	const loginMutation = useLogin();
	const verifyRiskTokenMutation = useVerifyRiskToken();
	const accountMutation = useAccount();

	const mutationFunction = async ({ database_id, signal, taskId }) => {
		const account = await accountMutation.mutateAsync(database_id);

		if (getExpireFromAllCookies(account.cookies) * 1000 > Date.now()) {
			addSuccessLog({
				group: taskId,
				database_id,
				message: 'already logged in',
			});
			return;
		}

		addInfoLog({
			message: 'getting permission...',
			group: taskId,
			database_id,
		});

		let permission = null;
		try {
			permission = await permissionMutation.mutateAsync({
				database_id,
				signal,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		if (permission.is_sanction_ip_disallow) {
			addErrorLog({
				error: { detail: { msg: 'ip disallowed' } },
				group: taskId,
				database_id,
			});
			return;
		}

		let loginName;

		addInfoLog({
			group: taskId,
			database_id,
			message: 'getting login name...',
		});

		try {
			loginName = await loginNameMutation.mutateAsync({
				database_id,
				signal,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			group: taskId,
			database_id,
			message: 'getting captcha...',
		});

		let captcha;

		try {
			captcha = await getCaptchaMutation.mutateAsync({
				database_id,
				signal,
				scene: SCENE.LOGIN,
				loginName: loginName.result,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			group: taskId,
			database_id,
			message: 'solving & verifying captcha...',
		});

		let solvedVerifyedCaptcha;
		try {
			solvedVerifyedCaptcha =
				await solveAndVerifyCaptchaMutation.mutateAsync({
					database_id,
					signal,
					captcha,
					loginName: loginName.result,
				});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			group: taskId,
			database_id,
			message: 'getting risk token...',
		});

		let riskToken, riskTokenType;

		try {
			const risk = await loginMutation.mutateAsync({
				database_id,
				signal,
				verifiedCaptchaToken: solvedVerifyedCaptcha.result.token,
			});
			riskToken = risk.result.risk_token;
			riskTokenType = risk.result.risk_token_type;
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			group: taskId,
			database_id,
			message: 'verifying risk token...',
		});

		try {
			await verifyRiskTokenMutation.mutateAsync({
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
			group: taskId,
			database_id,
			message: 'signing in...',
		});

		try {
			await loginMutation.mutateAsync({
				database_id,
				signal,
				verifiedCaptchaToken: solvedVerifyedCaptcha.result.token,
				verifiedRiskToken: riskToken,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addSuccessLog({
			message: 'login completed',
			group: taskId,
			database_id,
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['login'],
	});
};

const useLoginTask = () => {
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const changeAccountDescription =
		usePendingTasks.use.changeAccountDescription();

	const errorHandler = (error) => {
		if (error.message !== 'Aborted') {
			enqueueSnackbar('Error occured: ' + error.message, {
				variant: 'error',
			});
		}
	};

	const settleHandler = async () => {
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
		changeAccountDescription(taskId, id, 'Signing in...');
	};

	const loginMutation = useLoginAccountMutation();

	return useTask({
		asyncMutation: loginMutation.mutateAsync,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountProcessed: processedAccountHandler,
		onAccountMutation: accountMutationHandler,
		type: 'login',
	});
};

export default useLoginTask;
