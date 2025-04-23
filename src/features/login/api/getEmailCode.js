import { useMutation } from '@tanstack/react-query';
import { deduplicateRequests } from 'shared/api';
import { wait } from 'shared/lib/wait';
import { waitForCode } from './imapScanner';
import useSendEmailCode from './sendEmailCode';

const useGetEmailCode = () => {
	const sendEmailCode = useSendEmailCode();

	const sendEmailCodeWithoutCooldown = async ({
		database_id,
		signal,
		riskToken,
		componentId,
	}) => {
		const emailCodeRequest = await sendEmailCode.mutateAsync({
			database_id,
			signal,
			riskToken,
			componentId,
		});

		const coolDown = parseInt(emailCodeRequest.result.cool_down);

		if (coolDown) {
			await wait(coolDown + 1000);
			await sendEmailCodeWithoutCooldown({
				database_id,
				signal,
				riskToken,
				componentId,
			});
		}
	};

	const mutationFunction = ({
		database_id,
		signal,
		riskToken,
		componentId,
		taskId,
	}) => {
		return deduplicateRequests({
			requestKey: ['get email code', database_id],
			requestFn: async () => {
				await sendEmailCodeWithoutCooldown({
					database_id,
					signal,
					riskToken,
					componentId,
				});

				const result = await waitForCode({
					database_id,
					signal,
					taskId,
				});

				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['get email code'],
	});
};

export default useGetEmailCode;
