import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import useCustomRequestTask from '../api/customRequest.js';
import RequestSelect from './RequestSelect.jsx';

const CustomRequest = () => {
	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
		prelogin: false,
	});
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
									<Stack gap={3}>
										<TaskSettingsPrelogin
											settings={settings}
											onSettingsChange={(newSettings) =>
												setSettings(newSettings)
											}
										/>

										<RequestSelect
											onRequestChange={(newRequest) =>
												setRequestId(newRequest)
											}
											requestId={requestId}
										/>
									</Stack>
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
