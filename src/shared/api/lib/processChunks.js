/**
 *
 * @typedef {Object} Result
 * @property {number} id
 * @property {Object} data
 */

/**
 * asyncMutatuionFn funtion
 * @typedef {Function} AsyncMutation
 *
 * @param {Object} params
 * @param {string} params.database_id
 * @param {AbortSignal} [params.signal]
 *
 * @returns {Promise<Result>}
 *
 * @throws {Error}
 */

/**
 * processChunks function
 *
 * @param {number[]} idsToProcess
 * @param {number} threads
 * @param {AsyncMutation} asyncMutation
 * @param {Function} getRandomDelay
 * @param {AbortSignal} signal
 *
 *  */

const processChunks = ({
	idsToProcess,
	asyncMutation,
	settings,
	signal,
	onAccountProcessed,
	onAccountMutation,
	onSettled,
	taskId,
}) => {
	const getRandomDelay = () => {
		const min = settings.delay.min * 1000;
		const max = settings.delay.max * 1000;
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	let data = [];
	let i = 0;

	return new Promise((resolve, reject) => {
		if (signal?.aborted) {
			reject(new DOMException('Aborted', 'AbortError'));
			return;
		}

		signal?.addEventListener('abort', () => {
			reject(new DOMException('Aborted', 'AbortError'));
		});

		function processNextChunk() {
			if (signal?.aborted) {
				reject(new DOMException('Aborted', 'AbortError'));
				return;
			}

			if (i >= idsToProcess.length) {
				resolve(data);
				if (onSettled) {
					onSettled(data);
				}
				return;
			}

			const chunk = idsToProcess.slice(i, i + settings.threads);

			Promise.allSettled(
				chunk.map((id) => {
					if (onAccountMutation) {
						onAccountMutation(id, taskId);
					}
					return asyncMutation({
						database_id: id,
						signal,
						settings,
						taskId,
					})
						.then((data) => {
							if (onAccountProcessed) {
								onAccountProcessed({
									database_id: id,
									data,
									taskId,
								});
							}
							return { data, id };
						})
						.catch((error) => {
							if (onAccountProcessed) {
								onAccountProcessed({
									database_id: id,
									error: error?.data,
									taskId,
								});
							}
							throw Error(
								JSON.stringify({
									id,
									error: error?.data,
								}),
							);
						});
				}),
			).then((results) => {
				if (signal?.aborted) {
					reject(new DOMException('Aborted', 'AbortError'));
					return;
				}

				data.push(
					...results.map((result) => {
						return result.status === 'fulfilled'
							? {
									status: 'success',
									...result.value,
									error: null,
								}
							: {
									status: 'error',
									...JSON.parse(result.reason.message),
								};
					}),
				);

				i += settings.threads;

				if (i < idsToProcess.length) {
					new Promise((resolve) =>
						setTimeout(
							resolve,
							settings.delay.enabled ? getRandomDelay() : 0,
						),
					).then(() => processNextChunk());
				} else {
					if (onSettled) {
						onSettled(data);
					}
					resolve(data);
				}
			});
		}

		processNextChunk();
	});
};

export default processChunks;
