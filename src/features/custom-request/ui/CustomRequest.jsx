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
import useCustomRequestTask from '../api/customRequest.js';
import RequestSelect from './RequestSelect.jsx';

const CustomRequest = ({ children, onClose }) => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const [requestId, setRequestId] = useState('');
	const mutation = useCustomRequestTask(requestId);

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="custom request"
			settings={settings}
			errorText={requestId === '' ? 'Request is required' : ''}
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

							<RequestSelect
								sx={{ marginTop: 5 }}
								onRequestChange={(newRequest) =>
									setRequestId(newRequest)
								}
								requestId={requestId}
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

export default CustomRequest;
