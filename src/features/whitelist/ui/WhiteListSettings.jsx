import {
	FormControlLabel,
	FormGroup,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { useMemo } from 'react';

const WhiteListSettings = ({ settings, onSettingsChange }) => {
	const handleEnableTotpChange = (_event) => {
		onSettingsChange((prev) => ({
			...prev,
			enable_totp: !prev.enable_totp,
		}));
	};

	const enable_totp = useMemo(() => settings.enable_totp, [settings]);
	const handleEnableWhitelistChange = (_event) => {
		onSettingsChange((prev) => ({
			...prev,
			enable_whitelist: !prev.enable_whitelist,
		}));
	};

	const enable_whitelist = useMemo(
		() => settings.enable_whitelist,
		[settings],
	);

	return (
		<Stack gap={3}>
			<Stack gap={1}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={enable_totp}
								onChange={handleEnableTotpChange}
								value="enable_totp"
							/>
						}
						label="Enable 2FA (TOTP) if disabled"
					/>
				</FormGroup>
				<Typography
					variant="Caption"
					color="textSecondary"
				>
					TOTP is required for whitelist. Accounts without TOTP will
					be skipped
				</Typography>
			</Stack>

			<Stack gap={1}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								checked={enable_whitelist}
								onChange={handleEnableWhitelistChange}
								value="enable_whitelist"
							/>
						}
						label="Enable whitelist is disabled"
					/>
				</FormGroup>
			</Stack>
		</Stack>
	);
};

export default WhiteListSettings;
