const timeDifference = (date1, date2) => {
	// Вычисляем разницу в миллисекундах
	const differenceInMilliseconds = Math.abs(date1 - date2);

	// Переводим миллисекунды в часы и минуты
	const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	// Форматируем результат в виде "XXhYYm"
	return `${hours}h${String(minutes).padStart(2, '0')}m`;
};

export default timeDifference;
