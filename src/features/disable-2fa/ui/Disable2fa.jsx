import KeyOffRoundedIcon from '@mui/icons-material/KeyOffRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
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

const Disable2fa = () => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const [tooltipOpen, setTooltipOpen] = useState(false);

	const mutation = useDisable2faTask();

	return (
		<Tooltip
			title="Disable TOTP"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutation.mutate}
					task="disable 2fa"
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
					<IconButton
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<KeyOffRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default Disable2fa;
