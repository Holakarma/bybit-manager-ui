import { Button } from '@mui/material';
import { useDefaultAccount } from 'entities/account';
import { taskSettingsDefaultConfig } from 'entities/app-settings';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
} from 'entities/task';
import { useCallback, useState } from 'react';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useRegisterTask from '../api/registerAccount';
import TestEmailSetting from './TestEmailSetting';

const Register = ({ ...props }) => {
	const [settings, setSettings] = useState({
		...getTaskSettingsConfig(taskSettingsDefaultConfig),
		test_email: true,
	});
	const mutation = useRegisterTask();
	const defaultAccount = useDefaultAccount.use.defaultAccountId();

	const disabledTooltip = useCallback(
		(account) => (account.registered === true ? 'Already registered' : ''),
		[],
	);

	return (
		<CreateTask
			disabledTooltip={disabledTooltip}
			handleStart={mutation.mutate}
			task="register"
			errorText={!defaultAccount ? 'Default account is required' : ''}
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
							<TestEmailSetting
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
				Register
			</Button>
		</CreateTask>
	);
};

export default Register;
