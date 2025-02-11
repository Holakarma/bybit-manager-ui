import templateImportAccount from 'shared/assets/templates/template-import-accounts';
import * as XLSX from 'xlsx';

const downloadTemplate = () => {
	// Создаем рабочую книгу и лист
	const worksheet = XLSX.utils.aoa_to_sheet(templateImportAccount);

	// Создаем рабочую книгу
	const workbook = XLSX.utils.book_new();

	// Генерируем имя листа на основе текущей даты
	const now = new Date();
	const formattedDate = `date_${String(now.getDate()).padStart(2, '0')}_${String(now.getMonth() + 1).padStart(2, '0')}_${now.getFullYear()}`;
	const formattedTime = `time_${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}_${String(now.getSeconds()).padStart(2, '0')}`;
	const sheetName = `${formattedDate}.${formattedTime}`;

	// Добавляем лист в рабочую книгу с сгенерированным именем
	XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

	// Экспортируем в Excel
	XLSX.writeFile(workbook, 'template.xlsx');
};

export default downloadTemplate;
