import { Button } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useState } from 'react';
import useLoginTask from '../api/loginAccount';
import Settings from './Settngs';

const Login = ({ ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	const mutation = useLoginTask();

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
	});

	const startHandler = () => {
		mutation.mutate({
			database_ids: selectedAccounts.map(
				(account) => account.database_id,
			),
			settings,
		});
		handleClose();
	};

	return (
		<>
			<Button
				{...props}
				variant="contained"
				fullWidth
				disabled={isLoading || isError || !selectedAccounts.length}
				loading={isLoading}
				onClick={handleOpen}
			>
				Login
			</Button>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Create login task"
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

export default Login;
