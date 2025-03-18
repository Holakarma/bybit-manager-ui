const activeRequests = new Map();

const deduplicateRequests = ({ requestKey, requestFn }) => {
	const JSONKey = JSON.stringify(requestKey);

	if (activeRequests.has(JSONKey)) {
		return activeRequests.get(JSONKey);
	}

	const promise = requestFn().finally(() => activeRequests.delete(JSONKey));

	activeRequests.set(JSONKey, promise);
	return promise;
};

export default deduplicateRequests;
