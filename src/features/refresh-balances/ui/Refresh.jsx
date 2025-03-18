import { Button } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useState } from 'react';
import useRefreshTask from '../api/refreshBalances';
import Settings from './Settngs';

const Refresh = ({ ...props }) => {
	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const mutation = useRefreshTask();

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90 },
		prelogin: false,
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
				disabled={isLoading || isError || !selectedAccounts.length}
				loading={isLoading}
				variant="contained"
				fullWidth
				onClick={handleOpen}
			>
				Refresh
			</Button>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Create refresh balances task"
				taskDescription="Are you sure you want to refresh for following
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

export default Refresh;
