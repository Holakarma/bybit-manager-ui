import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Divider,
	Modal,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import LicenseInfo from 'entities/license/@X/app-settings/LicenseInfo';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultConfig as defaultApiConfig } from 'shared/api';
import {
	getAppConfig,
	RECAPTCHA_TYPE,
	setAppConfig,
} from 'shared/model/app-config';
import {
	API_CONFIG_NAME,
	VERIFY_ATTEMPTS_CONFIG_NAME,
} from 'shared/model/app-config/consts';
import { ModalBody } from 'shared/ui/modal-body';
import * as yup from 'yup';
import ApiSettings from './ApiSettings';
import CaptchaSelect from './CaptchaSelect';
import VerifyingSettings from './VerifyingSettings';

const schema = yup.object({
	[API_CONFIG_NAME]: yup.object({
		host: yup.string().required('Host is required'),
		port: yup
			.number()
			.typeError('Port must be a number')
			.min(0, 'Port must be between 0 and 65535')
			.max(65535, 'Port must be between 0 and 65535')
			.required('Port is required'),
	}),
	captchaType: yup
		.string()
		.oneOf(['recaptcha', 'gee4captcha'])
		.required('Captcha type is required'),
	[VERIFY_ATTEMPTS_CONFIG_NAME]: yup.object({
		email: yup
			.number()
			.min(1, 'Email attempts must be at least 1')
			.required('Email attempts are required'),
		totp: yup
			.number()
			.min(1, 'TOTP attempts must be at least 1')
			.required('TOTP attempts are required'),
	}),
});

const AppSettings = ({ children, tooltipTitle, ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const defaultConfig = {
		[API_CONFIG_NAME]: defaultApiConfig,
		captchaType: RECAPTCHA_TYPE,
		[VERIFY_ATTEMPTS_CONFIG_NAME]: {
			email: 3,
			totp: 3,
		},
	};

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: getAppConfig() || defaultConfig,
		mode: 'onChange',
	});

	const saveHandle = (data) => {
		setAppConfig(data);
		reset(data);
		location.reload();
	};

	const resetHandle = () => {
		setAppConfig(defaultConfig);
		reset(defaultConfig);
		location.reload();
	};

	return (
		<>
			<Tooltip
				title={tooltipTitle}
				placement="right"
			>
				<Button
					{...props}
					onClick={handleOpen}
					variant="outlined"
					color="secondary"
				>
					{children || 'Settings'}
				</Button>
			</Tooltip>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<ModalBody>
					<Typography
						variant="H5"
						marginBottom={4}
					>
						App Settings
					</Typography>

					<form onSubmit={handleSubmit(saveHandle)}>
						<Stack gap={5}>
							<LicenseInfo />

							<Divider />

							<CaptchaSelect
								control={control}
								name="captchaType"
								error={!!errors.captchaType}
							/>

							<VerifyingSettings
								control={control}
								name={VERIFY_ATTEMPTS_CONFIG_NAME}
								emailError={!!errors.verifyAttempts?.email}
								totpError={!!errors.verifyAttempts?.totp}
								emailHelperText={
									errors.verifyAttempts?.email?.message
								}
								totpHelperText={
									errors.verifyAttempts?.totp?.message
								}
							/>

							<ApiSettings
								control={control}
								errors={errors[API_CONFIG_NAME]}
							/>

							<Box textAlign="end">
								<Button onClick={resetHandle}>Reset</Button>
								<Button
									type="submit"
									disabled={!isDirty}
								>
									Save & Reload
								</Button>
							</Box>
						</Stack>
					</form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default AppSettings;
