import { taskSettingsDefaultConfig } from 'entities/app-settings';
import { useDepositCoinChain } from 'entities/coins-chains';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useRefreshTask from '../api/refreshDepositAddress';
import RefreshDepositSettings from './RefreshDepositSettings';

const Refresh = ({ children, onClose }) => {
	const mutation = useRefreshTask();

	const coin = useDepositCoinChain.use.coin();
	const chain = useDepositCoinChain.use.chain();

	const [settings, setSettings] = useState({
		...getTaskSettingsConfig(taskSettingsDefaultConfig),
		coin: coin,
		chain: chain,
	});

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="refresh addresses"
			settings={settings}
			onClose={onClose}
			errorText={
				!settings.coin
					? 'No coin selected'
					: !settings.chain
						? 'No chain selected'
						: undefined
			}
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
				{
					title: 'Coin and chain',
					component: (
						<RefreshDepositSettings
							settings={settings}
							onSettingsChange={(newSettings) =>
								setSettings(newSettings)
							}
						/>
					),
				},
			]}
		>
			{children}
		</CreateTask>
	);
};

export default Refresh;
