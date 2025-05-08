import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { FINANCE_ACCOUNT_TYPE } from 'entities/finance-account';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
} from 'entities/task';
import { useCallback, useState } from 'react';
import { isCookieAlive } from 'shared/lib/session-cookies';
import useTransferTask from '../api/transfer';
import TransferSettings from './TransferSettings';

const Transfer = () => {
	const [settings, setSettings] = useState({
		threads: 1,
		delay: { min: 60, max: 90, enabled: true },
		shuffle: false,
		from: FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_FUND,
		to: FINANCE_ACCOUNT_TYPE.ACCOUNT_TYPE_UNIFIED,
		coinSymbols: [],
	});

	const mutation = useTransferTask();

	const [tooltipOpen, setTooltipOpen] = useState(false);

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
		<Tooltip
			title="Transfer"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutate}
					disabledTooltip={disabledTooltip}
					errorText={
						!settings.coinSymbols.length ? 'No coins chosen' : ''
					}
					task="transfer"
					onCheckedIdsChange={(checkedIds) =>
						setDatabaseIds(checkedIds)
					}
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
					<IconButton
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<SyncAltRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default Transfer;
