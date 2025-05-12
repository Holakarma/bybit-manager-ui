import { Button } from '@mui/material';
import { taskSettingsDefaultConfig } from 'entities/app-settings';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useRefreshTask from '../api/refreshBalances';

const Refresh = ({ ...props }) => {
	const mutation = useRefreshTask();

	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="refresh balances"
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
							<TaskSettingsPrelogin
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
				fullWidth
				variant="contained"
			>
				Refresh
			</Button>
		</CreateTask>
	);
};

export default Refresh;
