import { Button } from '@mui/material';
import { taskSettingsDefaultConfig } from 'entities/app-settings';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
} from 'entities/task';
import { useState } from 'react';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useLoginTask from '../api/loginAccount';

const Login = ({ ...props }) => {
	const mutation = useLoginTask();

	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="login"
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
					component: <TaskAccountsPage key="accounts" />,
				},
			]}
		>
			<Button
				{...props}
				variant="contained"
				fullWidth
			>
				Login
			</Button>
		</CreateTask>
	);
};

export default Login;
