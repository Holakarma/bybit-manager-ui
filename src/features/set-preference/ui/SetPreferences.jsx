import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import useSetPreferencesTask from '../api/setPreferences';
import DepositSettings from './DepositSettings';

const SetPreferences = () => {
	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
		prelogin: true,
		deposit_to: 'uta',
	});

	const [tooltipOpen, setTooltipOpen] = useState(false);

	const mutation = useSetPreferencesTask();

	return (
		<Tooltip
			title="Set preferences"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutation.mutate}
					task="set_preferences"
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
									<DepositSettings
										settings={settings}
										onSettingsChange={(newSettings) =>
											setSettings(newSettings)
										}
										sx={{ marginTop: 2 }}
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
						<ManageAccountsRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default SetPreferences;
