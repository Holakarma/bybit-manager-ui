import templateImportAccount from 'shared/assets/templates/template-import-accounts';
import * as XLSX from 'xlsx';

const downloadTemplate = () => {
	const worksheet = XLSX.utils.aoa_to_sheet(templateImportAccount);

	const workbook = XLSX.utils.book_new();

	const now = new Date();
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();

	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const sheetName = `${day}.${month}.${year} ${hours}h${minutes}m${seconds}s`;

	XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

	XLSX.writeFile(workbook, 'template.xlsx');
};

export default downloadTemplate;
