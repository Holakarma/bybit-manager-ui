import { taskSettingsDefaultConfig } from 'entities/app-settings';
import { FINANCE_ACCOUNT_TYPE } from 'entities/finance-account';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
} from 'entities/task';
import { useCallback, useState } from 'react';
import { isCookieAlive } from 'shared/lib/session-cookies';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useTransferTask from '../api/transfer';
import TransferSettings from './TransferSettings';

const Transfer = ({ children, onClose }) => {
	const [settings, setSettings] = useState({
		...getTaskSettingsConfig(taskSettingsDefaultConfig),
		from: FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_FUND,
		to: FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_UNIFIED,
		coinSymbols: [],
	});

	const mutation = useTransferTask();

	const [databaseIds, setDatabaseIds] = useState([]);

	const disabledTooltip = useCallback(
		(account) =>
			isCookieAlive(account.cookies) ? '' : 'cookies are not alive',
		[],
	);

	const mutate = (props) => {
		mutation.mutate(props);
		setSettings((prev) => ({ ...prev, coinSymbols: [] }));
	};

	return (
		<CreateTask
			onClose={onClose}
			handleStart={mutate}
			disabledTooltip={disabledTooltip}
			errorText={!settings.coinSymbols.length ? 'No coins chosen' : ''}
			task="transfer"
			onCheckedIdsChange={(checkedIds) => setDatabaseIds(checkedIds)}
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
				{
					title: 'Transfer',
					component: (
						<TransferSettings
							key="transfer"
							settings={settings}
							databaseIds={databaseIds}
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

export default Transfer;
