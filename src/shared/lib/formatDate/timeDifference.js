const timeDifference = (date1, date2, format = 'hh:mm') => {
	const differenceInMilliseconds = Math.abs(date1 - date2);

	const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
	const totalMinutes = Math.floor(totalSeconds / 60);
	const totalHours = Math.floor(totalMinutes / 60);

	const hours = totalHours;
	const minutes = totalMinutes % 60;
	const seconds = totalSeconds % 60;

	switch (format) {
		case 'hh:mm:ss':
			if (hours === 0) {
				return `${minutes}m${seconds}s`;
			}
			return `${hours}h${String(minutes)}m${String(seconds)}s`;

		case 'mm:ss':
			if (minutes === 0) {
				return `${seconds}s`;
			}
			return `${minutes}m${String(seconds)}s`;

		case 'hh:mm':
		default:
			if (hours === 0) {
				return `${minutes}m`;
			}
			return `${hours}h${String(minutes)}m`;
	}
};

export default timeDifference;
