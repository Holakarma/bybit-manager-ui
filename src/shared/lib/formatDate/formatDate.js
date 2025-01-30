const formatDate = (date) => {
	// Получаем день, месяц, год, часы и минуты
	const day = String(date.getDate()).padStart(2, '0'); // День месяца (1–31)
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц (0–11, поэтому +1)
	const year = date.getFullYear(); // Год
	const hours = String(date.getHours()).padStart(2, '0'); // Часы (0–23)
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты (0–59)

	// Собираем строку в формате "DD.MM.YYYY HH:MM"
	return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export default formatDate;
