import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLogs } from 'entities/log';
import { taskDB, usePendingTasks, useTask } from 'entities/task';
import { useSnackbar } from 'notistack';
import SCENE from '../model/sceneEnum';
import useGetCaptcha from './getCaptcha';
import useLoginName from './getLoginName';
import usePermission from './getPermission';
import useLogin from './login';
import useSolveRecaptchav2 from './solveRecaptchav2';
import useVerifyRecaptchav2 from './verifyRecaptchav2';
import useVerifyRiskToken from './verifyRiskToken';

export const useLoginAccountMutation = () => {
	const addErrorLog = useLogs.use.addErrorLog();
	const addInfoLog = useLogs.use.addInfoLog();
	const addSuccessLog = useLogs.use.addSuccessLog();
	const permissionMutation = usePermission();
	const loginNameMutation = useLoginName();
	const getCaptchaMutation = useGetCaptcha();
	const solveRecaptchaMutation = useSolveRecaptchav2();
	const verifyRecaptchaMutation = useVerifyRecaptchav2();
	const loginMutation = useLogin();
	const verifyRiskTokenMutation = useVerifyRiskToken();

	const mutationFunction = async ({ database_id, signal, taskId }) => {
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
			message: 'solving captcha...',
		});

		let solvedCaptcha;
		try {
			solvedCaptcha = await solveRecaptchaMutation.mutateAsync({
				database_id,
				signal,
				google_id: captcha.result.google_id,
			});
		} catch (error) {
			addErrorLog({ error, group: taskId, database_id });
			return;
		}

		addInfoLog({
			group: taskId,
			database_id,
			message: 'verifying captcha...',
		});

		let solvedVerifyedCaptcha;

		try {
			solvedVerifyedCaptcha = await verifyRecaptchaMutation.mutateAsync({
				database_id,
				signal,
				serial_no: captcha.result.serial_no,
				g_recaptcha_response: solvedCaptcha.result.token,
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
			riskToken = risk.result[0];
			riskTokenType = risk.result[1];
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
			});
		} catch (error) {
			console.error(error);
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

	const logs = useLogs.use.logs();
	console.log(logs);

	const successHandler = async ({ data: accounts, task }) => {
		await taskDB.addTask({
			type: 'login',
			status: 'completed',
			data: accounts,
			startedAt: task.startedAt,
			id: task.id,
		});

		queryClient.invalidateQueries({
			queryKey: ['tasks'],
		});

		enqueueSnackbar('Login completed', {
			variant: 'info',
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
			queryKey: ['accounts'],
		});
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
		changeAccountDescription(taskId, id, 'Signing in...');
	};

	const loginMutation = useLoginAccountMutation();

	return useTask({
		asyncMutation: loginMutation.mutateAsync,
		onSuccess: successHandler,
		onError: errorHandler,
		onSettled: settleHandler,
		onAccountProcessed: processedAccountHandler,
		onAccountMutation: accountMutationHandler,
		type: 'login',
	});
};

export default useLoginTask;
