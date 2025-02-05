const isExcelFile = (file) => {
	const allowedTypes = [
		'application/vnd.ms-excel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	];
	return allowedTypes.includes(file.type);
};

export default isExcelFile;
