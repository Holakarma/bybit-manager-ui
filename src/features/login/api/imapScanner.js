import { useMutation } from '@tanstack/react-query';
import { Api, deduplicateRequests, ENDPOINTS } from 'shared/api';
import { wait } from 'shared/lib/wait';

const scan = ({ database_id, signal, since, regexp }) => {
	const api = new Api();
	return api.Post(
		ENDPOINTS.imap_scanner,
		{ since, regexp },
		{
			signal,
			params: { database_id },
		},
	);
};

const useScanner = () => {
	const mutationFunction = ({ database_id, signal, since, regexp }) => {
		return deduplicateRequests({
			requestKey: ['scan', database_id],
			requestFn: async () => {
				const result = await scan({
					database_id,
					signal,
					since,
					regexp,
				});
				return { result, database_id };
			},
		});
	};

	return useMutation({
		mutationFn: mutationFunction,
		mutationKey: ['scan'],
	});
};

export const waitForCode = async ({
	database_id,
	signal,
	since,
	regexp = '\\s(\\d{6})\\s',
	interval = 5,
	timeout = 90,
}) => {
	const currentTime = Date.now();
	const endTime = currentTime + timeout * 1000;
	if (!since) {
		const time15SecondsAgo = currentTime - 15000;
		since = new Date(time15SecondsAgo);
	}

	while (Date.now() < endTime) {
		const match = await scan({ database_id, signal, since, regexp });

		if (match && Object.keys(match).length !== 0) {
			return match;
		}

		await wait(interval * 1000);
	}

	throw Error(`No email received within ${timeout} seconds`);
};

export default useScanner;
