const groupedLogs = (logs) => {
	return logs.reduce((acc, log) => {
		if (acc[log.database_id]) {
			acc[log.database_id].push(log);
		} else {
			acc[log.database_id] = [log];
		}
		return acc;
	}, {});
};

export default groupedLogs;
