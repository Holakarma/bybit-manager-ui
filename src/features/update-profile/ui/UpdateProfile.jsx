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
import useUpdateProfileTask from '../api/updateProfile';

const UpdateProfile = ({ children, onClose }) => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const mutation = useUpdateProfileTask();

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="update profiles"
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

export default UpdateProfile;
