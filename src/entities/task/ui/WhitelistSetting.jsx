import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
} from '@mui/material';
import { useMemo } from 'react';

const WhitelistSetting = ({ settings, onSettingsChange }) => {
	const handleEnableWhitelistChange = () => {
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
		<ListItem disablePadding>
			<ListItemButton
				onClick={handleEnableWhitelistChange}
				disableRipple
			>
				<ListItemIcon>
					<PlaylistAddCheckRoundedIcon fontSize="large" />
				</ListItemIcon>

				<ListItemText primary="Enable whitelist if disabled" />

				<Switch
					checked={enable_whitelist}
					value="enable_totp"
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default WhitelistSetting;
