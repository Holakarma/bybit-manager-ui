import { Button } from '@mui/material';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
} from 'entities/task';
import { useState } from 'react';
import useRegisterTask from '../api/registerAccount';

const Register = ({ ...props }) => {
	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
	});
	const mutation = useRegisterTask();

	const isLegit = (account) => !account.registered;

	return (
		<CreateTask
			filterAccounts={isLegit}
			handleStart={mutation.mutate}
			task="register"
			settings={settings}
			pages={[
				{
					title: 'Settings',
					component: (
						<TaskSettingsPage key="settings">
							<TaskSettingsBase
								settings={settings}
								onSettingsChange={(newSettings) =>
									setSettings(newSettings)
								}
							/>
						</TaskSettingsPage>
					),
				},
				{
					title: 'Accounts',
					component: (
						<TaskAccountsPage
							key="accounts"
							filterAccounts={isLegit}
							filteredTooltip="Account is already registered"
						/>
					),
				},
			]}
		>
			<Button
				{...props}
				variant="contained"
				fullWidth
			>
				Register
			</Button>
		</CreateTask>
	);
};

export default Register;
