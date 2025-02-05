import {
	Alert,
	Button,
	Snackbar,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { useState } from 'react';
import { isExcelFile } from 'shared/lib/is-excel-file';
import { VisuallyHiddenInput } from 'shared/ui/visually-hidden-input';

const ImportFile = ({ ...props }) => {
	const { palette } = useTheme();
	const [isDragging, setIsDragging] = useState(false);

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

		const validFiles = files.filter(isExcelFile);

		if (validFiles.length > 0) {
			console.log(files);
		} else {
			setOpen(true);
		}
	};

	const handleFileSelect = (event) => {
		const files = Array.from(event.target.files);

		const validFiles = files.filter(isExcelFile);

		if (validFiles.length > 0) {
			console.log('Accepted files:', validFiles);
		} else {
			setOpen(true);
		}
	};

	const [open, setOpen] = useState(false);
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<>
			<Stack
				{...props}
				alignItems="end"
				gap={1}
			>
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
						<Typography variant="BodyM">
							Drop the .xlsx file here or
						</Typography>
						<Button
							component="label"
							variant="unstyled"
							sx={{ '&:hover': { opacity: 0.8 } }}
							color={palette.textPrimary.default}
						>
							<Typography
								variant="BodyM"
								sx={{ textDecoration: 'underline' }}
							>
								Pick one
							</Typography>
							<VisuallyHiddenInput
								accept=".xlsx .xls"
								type="file"
								onChange={handleFileSelect}
							/>
						</Button>
					</Stack>
				</Stack>
				<Button
					variant="unstyled"
					sx={{ '&:hover': { opacity: 0.8 } }}
					color={palette.textPrimary.default}
				>
					<Typography
						variant="Caption"
						sx={{ textDecoration: 'underline' }}
					>
						Download the template file
					</Typography>
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
