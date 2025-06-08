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
import useSetPreferencesTask from '../api/setPreferences';
import DepositSettings from './DepositSettings';

const SetPreferences = ({ children, onClose }) => {
	const [settings, setSettings] = useState({
		...getTaskSettingsConfig(taskSettingsDefaultConfig),
		deposit_to: 'uta',
	});

	const mutation = useSetPreferencesTask();

	return (
		<CreateTask
			onClose={onClose}
			handleStart={mutation.mutate}
			task="set_preferences"
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

							<DepositSettings
								settings={settings}
								onSettingsChange={(newSettings) =>
									setSettings(newSettings)
								}
								sx={{ marginTop: 5, paddingInline: 2 }}
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

export default SetPreferences;
