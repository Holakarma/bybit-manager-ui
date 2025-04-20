import { Button } from '@mui/material';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import useRefreshTask from '../api/refreshBalances';

const Refresh = ({ ...props }) => {
	const mutation = useRefreshTask();

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { enabled: true, min: 60, max: 90 },
		prelogin: true,
		shuffle: false,
	});

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="refresh balances"
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
			<Button
				{...props}
				fullWidth
				variant="contained"
			>
				Refresh
			</Button>
		</CreateTask>
	);
};

export default Refresh;
