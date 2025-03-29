const formatSeconds = (seconds) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	if (hours > 0) {
		return `${hours}h${minutes}m`;
	} else if (minutes > 0) {
		return `${minutes}m${remainingSeconds}s`;
	} else {
		return `${remainingSeconds}s`;
	}
};

export default formatSeconds;
