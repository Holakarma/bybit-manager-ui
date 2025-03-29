import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { defaultConfig as defaultApiConfig } from 'shared/api';
import { ModalBody } from 'shared/ui/modal-body';
import ApiSettings from './ApiSettings';

const AppSettings = ({ children, ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const defautlErrors = {
		apiConfig: false,
	};
	const defaultConfig = {
		apiConfig: defaultApiConfig,
	};

	/* Global Settings */
	const [settings, setSettings] = useState(
		JSON.parse(localStorage.getItem('appConfig')) || defaultConfig,
	);
	const resetHandle = () => {
		setSettings(defaultConfig);
	};

	const compareSettings = () =>
		JSON.stringify(settings) === localStorage.getItem('appConfig');
	const saveHandle = () => {
		localStorage.setItem('appConfig', JSON.stringify(settings));
		setSettings(JSON.parse(localStorage.getItem('appConfig')));
		location.reload();
	};

	/* Errors */
	const [errors, setErrors] = useState(defautlErrors);

	const hasErrors = Object.values(errors).some((error) => error);
	const handleApiError = (error) => {
		setErrors((prev) => ({ ...prev, apiConfig: error }));
	};

	/* API Settings */
	const handleApiSettingsChange = useCallback((newApiConfig) => {
		if (!newApiConfig) {
			handleApiError(true);
			return;
		}
		handleApiError(false);

		setSettings((prev) => ({
			...prev,
			apiConfig: newApiConfig,
		}));
	}, []);

	return (
		<>
			<Button
				{...props}
				onClick={handleOpen}
			>
				{children || 'Settings'}
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<ModalBody sx={{ minWidth: '600px' }}>
					<Typography
						variant="H5"
						marginBottom={4}
					>
						App Settings
					</Typography>
					<Stack gap={2}>
						<ApiSettings
							onSettingsChange={handleApiSettingsChange}
							defaultSettings={settings.apiConfig}
						/>

						<Box textAlign="end">
							<Button onClick={resetHandle}>Reset</Button>
							<Button
								disabled={hasErrors || compareSettings()}
								onClick={saveHandle}
							>
								Save & reload
							</Button>
						</Box>
					</Stack>
				</ModalBody>
			</Modal>
		</>
	);
};

export default AppSettings;
