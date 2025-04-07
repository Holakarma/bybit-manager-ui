import { Button } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useMemo, useState } from 'react';
import useRegisterTask from '../api/registerAccount';
import Settings from './Settngs';

const Register = ({ ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
	});

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	const legitAccounts = useMemo(() => {
		if (selectedAccounts) {
			return selectedAccounts.filter((account) => !account.registered);
		}
		return null;
	}, [selectedAccounts]);

	const mutation = useRegisterTask();

	const startHandler = () => {
		mutation.mutate({
			database_ids: legitAccounts.map((account) => account.database_id),
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
				disabled={isLoading || isError || !legitAccounts?.length}
				loading={isLoading}
				onClick={handleOpen}
			>
				Register
			</Button>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Create register task"
				taskDescription="Are you sure you want to register for following
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

export default Register;
