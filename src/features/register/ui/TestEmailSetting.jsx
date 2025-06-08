import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch
} from '@mui/material';

import { useMemo } from 'react';

const TestEmailSetting = ({ settings, onSettingsChange }) => {
	const testEmail = useMemo(() => settings.test_email, [settings.test_email]);

	const handleTestEmailChange = (_event) => {
		onSettingsChange((prev) => ({ ...prev, test_email: !prev.test_email }));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton
				onClick={handleTestEmailChange}
				disableRipple
			>
				<ListItemIcon>
					<AlternateEmailRoundedIcon fontSize="large" />
				</ListItemIcon>

				<ListItemText
				 	primary="Check email"
					secondary="Check if the email is already registered before signing up"
				/>

				<Switch
					checked={testEmail}
					value="test_email"
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default TestEmailSetting;
