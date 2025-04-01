import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useState } from 'react';
import Settings from './Settngs.jsx';

const CustomRequest = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
	});

	// const mutation = useDisable2faTask();

	// const startHandler = () => {
	// 	mutation.mutate({
	// 		database_ids: selectedAccounts.map(
	// 			(account) => account.database_id,
	// 		),
	// 		settings,
	// 	});
	// 	handleClose();
	// };

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	return (
		<>
			<Tooltip title="Custom request">
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
						<SmartButtonRoundedIcon />
					</IconButton>
				</Stack>
			</Tooltip>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Create custom request"
				taskDescription="Your request for the following accounts"
				accounts={selectedAccounts}
				// onStart={startHandler}
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

export default CustomRequest;
