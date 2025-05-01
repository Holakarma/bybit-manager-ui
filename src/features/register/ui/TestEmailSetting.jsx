import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {
	FormControlLabel,
	FormGroup,
	Stack,
	Switch,
	Tooltip,
} from '@mui/material';
import { useMemo } from 'react';

const TestEmailSetting = ({ settings, onSettingsChange, ...props }) => {
	const testEmail = useMemo(() => settings.test_email, [settings.test_email]);

	const handleTestEmailChange = (_event) => {
		onSettingsChange((prev) => ({ ...prev, test_email: !prev.test_email }));
	};

	return (
		<Stack
			direction="row"
			gap={1}
			alignItems="center"
			{...props}
		>
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={testEmail}
							onChange={handleTestEmailChange}
							value="test_email"
						/>
					}
					label="Test email"
				/>
			</FormGroup>
			<Tooltip title="Check if the email is already registered before signing up">
				<HelpOutlineRoundedIcon color="textSecondary" />
			</Tooltip>
		</Stack>
	);
};

export default TestEmailSetting;
