import { taskSettingsDefaultConfig } from 'entities/app-settings';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
} from 'entities/task';
import { useState } from 'react';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useLogoutTask from '../api/logoutAccount';

const Logout = ({ children, onClose }) => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const mutation = useLogoutTask();

	return (
		<CreateTask
			onClose={onClose}
			handleStart={mutation.mutate}
			task="logout"
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
			{children}
		</CreateTask>
	);
};

export default Logout;
