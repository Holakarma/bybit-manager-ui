import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import useEnable2faTask from '../api/enable2fa.js';

const Enable2fa = () => {
	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
		prelogin: true,
	});

	const [tooltipOpen, setTooltipOpen] = useState(false);

	const mutation = useEnable2faTask();

	return (
		<Tooltip
			title="Enable TOTP"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutation.mutate}
					task="enable 2fa"
					settings={settings}
					pages={[
						{
							title: 'Settings',
							component: (
								<TaskSettingsPage key="settings">
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
					<IconButton
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<KeyRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default Enable2fa;
