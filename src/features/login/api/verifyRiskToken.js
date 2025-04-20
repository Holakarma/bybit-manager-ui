import { useMutation } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import RISKTOKETYPE from '../model/riskTokenEnum';
import useGetEmailCode from './getEmailCode';
import useGetRiskTokenComponents from './getRiskComponents';

const verifyChallengeRiskToken = ({ database_id, signal, body }) => {
	const api = new Api();
	return api.Post(ENDPOINTS.verify_risk_token, body, {
		signal,
		params: { database_id },
	});
};

const useVerifyChallengeRiskToken = () => {
	const getRiskComponents = useGetRiskTokenComponents();
	const getEmailCode = useGetEmailCode();
	const accountMutation = useAccount();

	const mutationFunction = ({
		database_id,
		signal,
		riskToken,
		emailVerifyAttempts = 2,
		totpVerifyAttmepts = 3,
	}) => {
		return deduplicateRequests({
			requestKey: ['verify challenge risk token', database_id],
			requestFn: async () => {
				const riskTokenComponents = await getRiskComponents.mutateAsync(
					{
						database_id,
						signal,
						riskToken,
					},
				);

				const riskTokenComponent =
					riskTokenComponents.result.risk_token;
				const logcExt = riskTokenComponents.result.logc_ext;

				const account = await accountMutation.mutateAsync(database_id);

				if (
					logcExt.required.includes('google2fa') &&
					!account.totp_secret
				) {
					throw Error('TOTP secret required');
				}
				if (
					logcExt.required.includes('payment_password_verify') &&
					!account.payment_password
				) {
					throw Error('Payment password required');
				}

				for (let i = 0; i < emailVerifyAttempts; i++) {
					let emailCode;

					const verifyBody = {
						risk_token: riskTokenComponent,
					};
					if (logcExt.required.includes('email_verify')) {
						emailCode = await getEmailCode.mutateAsync({
							database_id,
							signal,
							riskToken,
						});

						Object.assign(verifyBody, {
							email_code: emailCode,
						});
					}

					if (logcExt.required.includes('google2fa')) {
						Object.assign(verifyBody, {
							totp_code: true,
						});
					}
					if (logcExt.required.includes('member_login_pwd_verify')) {
						Object.assign(verifyBody, {
							account_password: true,
						});
					}
					if (logcExt.required.includes('payment_password_verify')) {
						Object.assign(verifyBody, {
							payment_password: true,
						});
					}

					for (let j = 0; j < totpVerifyAttmepts; j++) {
						try {
							await verifyChallengeRiskToken({
								database_id,
								signal,
								body: verifyBody,
							});
							return;
						} catch (_error) {
							if (j === totpVerifyAttmepts + 1) {
								throw Error('Cannot verify risk token');
							}
							continue;
						}
					}
				}

				throw Error('Failed to verify risk token');
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['verify challenge risk token'],
	});
};

const useVerifyRiskToken = () => {
	const verifyChallengeRiskToken = useVerifyChallengeRiskToken();

	const mutationFunction = ({
		database_id,
		signal,
		riskToken,
		riskTokenType,
	}) => {
		return deduplicateRequests({
			requestKey: ['verify risk token', database_id],
			requestFn: async () => {
				if (
					riskTokenType === RISKTOKETYPE.PASS ||
					riskTokenType === RISKTOKETYPE.GUIDE
				)
					return;

				if (riskTokenType === RISKTOKETYPE.CHALLENGE) {
					await verifyChallengeRiskToken.mutateAsync({
						database_id,
						signal,
						riskToken,
					});
					return;
				}

				if (riskTokenType === RISKTOKETYPE.REJECT) {
					throw Error(
						`Risk token type ${riskTokenType}! Maybe login required`,
					);
				}

				throw Error(`Wrong risk token type ${riskTokenType}!`);
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['verify risk token'],
	});
};

export default useVerifyRiskToken;
