import * as XLSX from 'xlsx';

const readExcelSheets = (file) =>
	new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: 'array' });

			var result = {};
			for (var sheetName in workbook.Sheets) {
				const worksheet = workbook.Sheets[sheetName];

				const jsonData = XLSX.utils.sheet_to_json(worksheet, {
					header: 1,
				});

				result[sheetName] = jsonData;
			}
			resolve(result);
		};
		reader.readAsArrayBuffer(file);
	});

export default readExcelSheets;
