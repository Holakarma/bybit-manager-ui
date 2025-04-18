import { useMutation } from '@tanstack/react-query';
import { deduplicateRequests } from 'shared/api';
import {
	GEE4CAPTCHA_TYPE,
	getCaptchaType,
	RECAPTCHA_TYPE,
} from 'shared/model/app-config';
import useSolveGee4Test from './solveGee4Test';
import useSolveRecaptchav2 from './solveRecaptchav2';
import useVerifyGee4Test from './verifyGee4Test';
import useVerifyRecaptchav2 from './verifyRecaptchav2';

const useSolveAndVerifyCaptcha = () => {
	const solveRecaptchaMutation = useSolveRecaptchav2();
	const verifyRecaptchaMutation = useVerifyRecaptchav2();

	const solveGee4TestMutation = useSolveGee4Test();
	const verifyGee4TestMutation = useVerifyGee4Test();

	const mutationFunction = ({ database_id, signal, captcha, loginName }) => {
		return deduplicateRequests({
			requestKey: ['solve and verify captcha', database_id],
			requestFn: async () => {
				const type = getCaptchaType();

				if (type === RECAPTCHA_TYPE) {
					/* Recaptcha */
					const solvedCaptcha =
						await solveRecaptchaMutation.mutateAsync({
							database_id,
							signal,
							google_id: captcha.result.google_id,
						});

					return await verifyRecaptchaMutation.mutateAsync({
						database_id,
						signal,
						serial_no: captcha.result.serial_no,
						g_recaptcha_response: solvedCaptcha.result.token,
					});
				} else if (type === GEE4CAPTCHA_TYPE) {
					/* Geetest v4 */
					const solvedCaptcha = solveGee4TestMutation.mutateAsync({
						database_id,
						signal,
						captcha_id: captcha.result.gt4,
					});

					return await verifyGee4TestMutation.mutateAsync({
						database_id,
						signal,
						serial_no: captcha.result.serial_no,
						login_name: loginName,
						captcha_output: solvedCaptcha.result.result,
						lot_number: solvedCaptcha.result.lot_number,
						pass_token: solvedCaptcha.result.pass_token,
						gee4test_gen_time: solvedCaptcha.result.gen_time,
					});
				}
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['solve and verify captcha'],
	});
};

export default useSolveAndVerifyCaptcha;
