import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
} from '@mui/material';
import { useMemo } from 'react';

const TOTPSetting = ({ settings, onSettingsChange }) => {
	const handleEnableTotpChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			enable_totp: !prev.enable_totp,
		}));
	};

	const enable_totp = useMemo(() => settings.enable_totp, [settings]);

	return (
		<ListItem disablePadding>
			<ListItemButton
				onClick={handleEnableTotpChange}
				disableRipple
			>
				<ListItemIcon>
					<KeyRoundedIcon fontSize="large" />
				</ListItemIcon>

				<ListItemText
					primary="Enable 2FA (TOTP) if disabled"
					secondary={
						'TOTP is required for whitelist. Accounts without TOTP will be skipped'
					}
				/>

				<Switch
					checked={enable_totp}
					value="enable_totp"
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default TOTPSetting;
