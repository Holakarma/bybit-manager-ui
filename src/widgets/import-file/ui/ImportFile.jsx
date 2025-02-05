import {
	Alert,
	Button,
	Snackbar,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { useState } from 'react';
import templateImportAccount from 'shared/assets/templates/template-import-accounts';
import { isExcelFile } from 'shared/lib/is-excel-file';
import { VisuallyHiddenInput } from 'shared/ui/visually-hidden-input';
import * as XLSX from 'xlsx';

const ImportFile = ({ ...props }) => {
	const { palette } = useTheme();
	const [isDragging, setIsDragging] = useState(false);
	const [file, setFile] = useState(null);

	const handleDragEnter = (event) => {
		event.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsDragging(false);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleDrop = (event) => {
		event.preventDefault();
		setIsDragging(false);

		const files = Array.from(event.dataTransfer.files);

		validateFiles(files);
	};

	const handleFileSelect = (event) => {
		const files = Array.from(event.target.files);

		validateFiles(files);
	};

	const validateFiles = (files) => {
		const validFiles = files.filter(isExcelFile);

		if (validFiles.length > 0) {
			setFile(validFiles[0]);
		} else {
			setOpen(true);
		}
	};

	console.log(file);
	const [open, setOpen] = useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

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

	return (
		<>
			<Stack
				{...props}
				alignItems="end"
				gap={1}
			>
				<Button
					component="label"
					variant="unstyled"
					sx={{ width: '100%' }}
				>
					<VisuallyHiddenInput
						accept=".xlsx .xls"
						type="file"
						onChange={handleFileSelect}
					/>
					<Stack
						width="100%"
						alignItems="center"
						justifyContent="center"
						p={5}
						border={`4px dashed ${isDragging ? palette.primary.main : palette.secondary.main}`}
						borderRadius={3}
						onDragEnter={handleDragEnter}
						onDragLeave={handleDragLeave}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						sx={{
							cursor: 'pointer',
							transition: 'border-color 0.3s ease',
						}}
					>
						<Stack alignItems="center">
							{file ? (
								<Typography variant="BodyM">
									{file.name}
								</Typography>
							) : (
								<>
									<Typography variant="BodyM">
										Drop the .xlsx file here or
									</Typography>
									<Typography
										variant="BodyM"
										sx={{ textDecoration: 'underline' }}
									>
										Pick one
									</Typography>
								</>
							)}
						</Stack>
					</Stack>
				</Button>
				<Button
					variant="unstyled"
					sx={{ '&:hover': { opacity: 0.8 } }}
					color={palette.textPrimary.default}
				>
					<Button
						variant="unstyled"
						sx={{ '&:hover': { opacity: 0.8 } }}
						onClick={downloadTemplate}
					>
						<Typography
							variant="Caption"
							sx={{ textDecoration: 'underline' }}
						>
							Download the template file
						</Typography>
					</Button>
				</Button>
			</Stack>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
			>
				<Alert
					onClose={handleClose}
					severity="error"
					variant="filled"
					sx={{ width: '100%' }}
				>
					Only .xls and .xsls files are acceptable
				</Alert>
			</Snackbar>
		</>
	);
};

export default ImportFile;
