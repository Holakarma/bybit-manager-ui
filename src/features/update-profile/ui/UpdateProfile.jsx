import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
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
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useUpdateProfileTask from '../api/updateProfile';

const UpdateProfile = () => {
	const [settings, setSettings] = useState(
		getTaskSettingsConfig(taskSettingsDefaultConfig),
	);

	const [tooltipOpen, setTooltipOpen] = useState(false);

	const mutation = useUpdateProfileTask();

	return (
		<Tooltip
			title="Update profile"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutation.mutate}
					task="update profiles"
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
						<SyncRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default UpdateProfile;
