export const parseCurl = (curlCommand) => {
	const result = {
		method: 'GET', // По умолчанию метод GET
		url: '',
		params: {},
		body: null,
		data: null,
		headers: {},
	};

	// Удаляем начальное слово curl и обрезаем пробелы
	let command = curlCommand.trim().replace(/^curl\s+/, '');

	// Регулярное выражение для извлечения URL
	const urlMatch = command.match(/'(https?:\/\/[^']+)'/);
	if (urlMatch) {
		result.url = urlMatch[1];
		command = command.replace(urlMatch[0], '').trim();
	}

	// Извлекаем query-параметры из URL
	const urlParts = result.url.split('?');
	if (urlParts.length > 1) {
		const queryParams = new URLSearchParams(urlParts[1]);
		queryParams.forEach((value, key) => {
			result.params[key] = value;
		});
		result.url = urlParts[0]; // Оставляем только базовый URL
	}

	// Регулярное выражение для извлечения метода
	const methodMatch = command.match(/-X\s+(\w+)/);
	if (methodMatch) {
		result.method = methodMatch[1].toUpperCase();
		command = command.replace(methodMatch[0], '').trim();
	}

	// Регулярное выражение для извлечения заголовков
	const headerMatches = command.matchAll(/-H\s+'([^:]+):\s*([^']+)'/g);
	for (const match of headerMatches) {
		const [_, key, value] = match;
		result.headers[key] = value;
	}
	command = command.replace(/-H\s+'[^']+'/g, '').trim();

	// Проверяем, есть ли тело запроса
	const contentType =
		result.headers['Content-Type'] || result.headers['content-type'];
	if (contentType) {
		if (contentType.includes('application/json')) {
			// Ищем JSON-тело
			const jsonMatch = command.match(/--data-raw\s+'({.*})'/);
			if (jsonMatch) {
				try {
					result.body = JSON.parse(jsonMatch[1]);
				} catch (e) {
					console.error('Ошибка при парсинге JSON:', e);
				}
			}
		} else if (
			contentType.includes('application/x-www-form-urlencoded') ||
			contentType.includes('multipart/form-data')
		) {
			const formDataMatch = command.matchAll(
				/(--data-raw|-d|--form|-F)\s+'([^']+)'/g,
			);
			const formData = [];
			for (const match of formDataMatch) {
				const [_, _flag, value] = match;
				formData.push(value); // Сохраняем значение из соответствующего флага
			}
			if (formData.length > 0) {
				result.data = formData.join('&'); // Объединяем все строки через &
			}
		}
	}
	return result;
};
