import LogoutIcon from '@mui/icons-material/Logout';
import { Button, Tooltip } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useState } from 'react';
import useLogoutTask from '../api/logoutAccount';
import Settings from './Settngs';

const Logout = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
	});

	const mutation = useLogoutTask();

	const startHandler = () => {
		mutation.mutate({
			database_ids: selectedAccounts.map(
				(account) => account.database_id,
			),
			settings,
		});
		handleClose();
	};

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	return (
		<>
			<Tooltip title="Logout">
				<Button
					sx={{ height: '100%' }}
					variant="outlined"
					color="secondary"
					onClick={handleOpen}
					disabled={isLoading || isError || !selectedAccounts.length}
				>
					<LogoutIcon />
				</Button>
			</Tooltip>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Create logout task"
				taskDescription="Are you sure you want to logout for following
					accounts?"
				accounts={selectedAccounts}
				onStart={startHandler}
				settingsComponent={
					<Settings
						settings={settings}
						onSettingsChange={(newSettings) =>
							setSettings(newSettings)
						}
					/>
				}
			/>
		</>
	);
};

export default Logout;
