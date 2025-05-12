import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { taskSettingsDefaultConfig } from 'entities/app-settings/index.js';
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

const CustomRequest = () => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const [requestId, setRequestId] = useState('');
	const mutation = useCustomRequestTask(requestId);

	return (
		<Tooltip
			title="Custom request"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutation.mutate}
					task="custom request"
					settings={settings}
					errorText={requestId === '' ? 'Request is required' : ''}
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
					<IconButton
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<SmartButtonRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default CustomRequest;
