import { useMutation } from '@tanstack/react-query';
import { useGetAccounts } from 'entities/account';
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
	const { data: accounts } = useGetAccounts();

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
				console.log('verifying challenge risk token');

				const riskTokenComponents = await getRiskComponents.mutateAsync(
					{
						database_id,
						signal,
						riskToken,
					},
				);

				console.log(riskTokenComponents);

				const riskTokenComponent = riskTokenComponents.result[0];
				const logcExc = riskTokenComponents.result[3];

				const account = accounts.find(
					(account) => account.database_id === database_id,
				);

				if (
					logcExc.required.includes('google2fa') &&
					!account.totp_secret
				) {
					throw Error('TOTP secret required');
				}
				if (
					logcExc.required.includes('payment_password_verify') &&
					!account.payment_password
				) {
					throw Error('Payment password required');
				}

				for (let i = 0; i < emailVerifyAttempts; i++) {
					let emailCode;

					const verifyBody = {
						risk_token: riskTokenComponent,
					};
					if (logcExc.required.includes('email_verify')) {
						emailCode = await getEmailCode.mutateAsync({
							database_id,
							signal,
							riskToken,
						});

						Object.assign(verifyBody, {
							email_code: emailCode,
						});
					}

					if (logcExc.required.includes('google2fa')) {
						Object.assign(verifyBody, {
							totp_code: true,
						});
					}
					if (logcExc.required.includes('member_login_pwd_verify')) {
						Object.assign(verifyBody, {
							account_password: true,
						});
					}
					if (logcExc.required.includes('payment_password_verify')) {
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
