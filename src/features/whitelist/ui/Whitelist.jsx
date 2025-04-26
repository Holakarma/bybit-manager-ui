import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useDefaultAccount } from 'entities/account';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useCallback, useEffect, useState } from 'react';
import useAddWithdrawAddressesTask from '../api/addWhiteList';
import WhiteListParams from './WhiteListParams';
import WhiteListSettings from './WhiteListSettings';

const Whitelist = () => {
	const [tooltipOpen, setTooltipOpen] = useState(false);
	const defaultAccount = useDefaultAccount.use.defaultAccountId();
	const mutation = useAddWithdrawAddressesTask();

	const [settings, setSettings] = useState({
		threads: 1,
		delay: { enabled: true, min: 60, max: 90 },
		shuffle: false,
		prelogin: true,
		enable_totp: false,
		enable_whitelist: false,
		universal: true,
		remark: '',
		coin: { coin: '' },
		chain: { chain_full_name: '' },
		addresses: [],
		setAsDefault: true,
		verify: true,
		memo: '',
		internalAddressType: '',
	});

	const [errorText, setErrorText] = useState('');
	const [ids, setIds] = useState([]);

	useEffect(() => {
		if (ids.length !== settings.addresses.length) {
			setErrorText('Addresses count does not match');
		} else if (!defaultAccount) {
			setErrorText('Default account is required');
		} else if (settings.chain.has_memo && !settings.memo) {
			setErrorText('Memo is required');
		} else {
			setErrorText('');
		}
	}, [ids, settings, defaultAccount]);

	const onSettingsChange = useCallback(
		(newSettings) => setSettings(newSettings),
		[],
	);

	const getAddressesObj = (addresses) => {
		const obj = {};
		addresses.forEach((address, i) => (obj[ids[i]] = address));
		return obj;
	};

	const settingsAdapter = (settings) => {
		return {
			...settings,
			addresses: getAddressesObj(settings.addresses),
			chain_type: settings.chain.chain_type,
			coin: settings.coin.coin,
		};
	};

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
					handleStart={mutation.mutate}
					settingsAdapter={settingsAdapter}
					onCheckedIdsChange={(ids) => setIds(ids)}
					errorText={errorText}
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
											onSettingsChange={onSettingsChange}
										/>
										<WhiteListSettings
											settings={settings}
											onSettingsChange={onSettingsChange}
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
							title: 'Withdraw params',
							component: (
								<TaskSettingsPage key="params">
									<WhiteListParams
										settings={settings}
										onSettingsChange={onSettingsChange}
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
