import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Switch,
} from '@mui/material';
import { useMemo } from 'react';

const TaskSettingsPrelogin = ({ settings, onSettingsChange }) => {
	const prelogin = useMemo(() => settings.prelogin, [settings]);

	const handlePreloginChange = () => {
		onSettingsChange((prev) => ({ ...prev, prelogin: !prev.prelogin }));
	};

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton
					onClick={handlePreloginChange}
					disableRipple
				>
					<ListItemIcon>
						<LoginRoundedIcon fontSize="large" />
					</ListItemIcon>

					<ListItemText primary="Prelogin" />

					<Switch
						checked={prelogin}
						value="prelogin"
					/>
				</ListItemButton>
			</ListItem>
		</>
	);
};

export default TaskSettingsPrelogin;
