import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useState } from 'react';
import useUpdateProfileTask from '../api/updateProfile';
import Settings from './Settngs';

const UpdateProfile = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { enabled: true, min: 60, max: 90 },
		prelogin: true,
		shuffle: false,
	});

	const mutation = useUpdateProfileTask();

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
			<Tooltip title="Update profile">
				<Stack
					sx={{ height: '100%' }}
					justifyContent="center"
					alignItems="center"
				>
					<IconButton
						onClick={handleOpen}
						disabled={
							isLoading || isError || !selectedAccounts.length
						}
					>
						<SyncRoundedIcon />
					</IconButton>
				</Stack>
			</Tooltip>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Create update task"
				taskDescription="Are you sure you want to update profiles for following
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

export default UpdateProfile;
