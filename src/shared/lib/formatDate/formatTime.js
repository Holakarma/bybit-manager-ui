const formatTime = (date) => {
	const hours = String(date.getHours()).padStart(2, '0'); // Часы (0–23)
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты (0–59)

	// Собираем строку в формате "DD.MM.YYYY HH:MM"
	return `${hours}:${minutes}`;
};

export default formatTime;
