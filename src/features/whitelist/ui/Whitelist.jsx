import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useState } from 'react';
import WhiteListParams from './WhiteListParams';
import WhiteListSettings from './WhiteListSettings';

const Whitelist = () => {
	const [tooltipOpen, setTooltipOpen] = useState(false);

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { enabled: true, min: 60, max: 90 },
		shuffle: false,
		prelogin: true,
		enable_totp: false,
		enable_whitelist: false,
	});

	const [withdrawParams, setWithdrawParams] = useState({
		universal: true,
		remark: '',
		coin: '',
		chainType: '',
		addresses: [],
		verify: true,
	});

	const [ids, setIds] = useState([]);

	return (
		<Tooltip
			title="whitelist"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={({ database_ids, settings }) =>
						console.log({
							database_ids,
							settings,
						})
					}
					onCheckedIdsChange={(ids) => setIds(ids)}
					errorText={
						ids.length !== withdrawParams.addresses.length
							? 'Addresses count does not match'
							: ''
					}
					task="whitelist"
					settings={settings}
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
										<WhiteListSettings
											settings={settings}
											onSettingsChange={(newSettings) =>
												setSettings(newSettings)
											}
										/>
									</Stack>
								</TaskSettingsPage>
							),
						},
						{
							title: 'Accounts',
							component: <TaskAccountsPage key="accounts" />,
						},
						{
							title: 'Withdraw Params',
							component: (
								<TaskSettingsPage key="params">
									<WhiteListParams
										settings={withdrawParams}
										onSettingsChange={(newSettings) =>
											setWithdrawParams(newSettings)
										}
									/>
								</TaskSettingsPage>
							),
						},
					]}
				>
					<IconButton
						onMouseEnter={() => setTooltipOpen(true)}
						onMouseLeave={() => setTooltipOpen(false)}
					>
						<QueueRoundedIcon />
					</IconButton>
				</CreateTask>
			</Stack>
		</Tooltip>
	);
};

export default Whitelist;
