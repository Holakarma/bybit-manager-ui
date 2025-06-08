import { taskSettingsDefaultConfig } from 'entities/app-settings';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import getTaskSettingsConfig from 'shared/model/app-config/getTaskSettingsConfig.js';
import useDisable2faTask from '../api/disable2fa.js';

const Disable2fa = ({ children, onClose }) => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const mutation = useDisable2faTask();

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="disable 2fa"
			settings={settings}
			onClose={onClose}
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
			{children}
		</CreateTask>
	);
};

export default Disable2fa;
