import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton, Stack, Tooltip } from '@mui/material';
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

const Logout = () => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const [tooltipOpen, setTooltipOpen] = useState(false);

	const mutation = useLogoutTask();

	return (
		<Tooltip
			title="Logout"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
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
					<IconButton
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<LogoutIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default Logout;
