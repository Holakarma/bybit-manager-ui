import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useDefaultAccount } from 'entities/account';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsPage,
	TaskSettingsPrelogin,
} from 'entities/task';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isCookieAlive } from 'shared/lib/session-cookies';
import useAddWithdrawAddressesTask from '../api/addWhitelist';
import WhiteListParams from './WhiteListParams';
import WhiteListSettings from './WhiteListSettings';
import WhitelistTable from './WhitelistTable';

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
		memo: [],
		setAsDefault: true,
		verify: true,
		internalAddressType: '',
	});

	const [errorText, setErrorText] = useState('');
	const [ids, setIds] = useState([]);

	useEffect(() => {
		if (ids.length !== settings.addresses.length) {
			setErrorText('Addresses count does not match');
		} else if (!defaultAccount) {
			setErrorText('Default account is required');
		} else if (
			settings.chain.has_memo &&
			ids.length !== settings.memo.length
		) {
			setErrorText('Memo count does not match');
		} else {
			setErrorText('');
		}
	}, [ids, settings, defaultAccount]);

	const getAddressesObj = useCallback(
		(addresses) => {
			const obj = {};
			addresses.forEach((address, i) => (obj[ids[i]] = address));
			return obj;
		},
		[ids],
	);
	const adaptedSettings = useMemo(
		() => ({
			...settings,
			addresses: getAddressesObj(settings.addresses),
			memo: getAddressesObj(settings.memo),
		}),
		[settings, getAddressesObj],
	);

	const onSettingsChange = useCallback(
		(newSettings) => setSettings(newSettings),
		[],
	);

	const disabledTooltip = useCallback(
		(account) => {
			if (!isCookieAlive(account.cookies) && !settings.prelogin) {
				return 'Prelogin is not enabled';
			}
		},
		[settings.prelogin],
	);

	return (
		<Tooltip
			title="Whitelist"
			open={tooltipOpen}
		>
			<Stack
				sx={{ height: '100%' }}
				justifyContent="center"
				alignItems="center"
			>
				<CreateTask
					handleStart={mutation.mutate}
					onCheckedIdsChange={(ids) => setIds(ids)}
					errorText={errorText}
					loading={
						!adaptedSettings.coin.coin ||
						!adaptedSettings.chain.chain_full_name
					}
					task="whitelist"
					settings={adaptedSettings}
					disabledTooltip={disabledTooltip}
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
										ids={ids}
										onSettingsChange={onSettingsChange}
										onError={() =>
											setErrorText(
												'Error while getting chains',
											)
										}
									/>
								</TaskSettingsPage>
							),
						},
						{
							title: 'Withdraw table',
							component: (
								<WhitelistTable
									key="table"
									ids={ids}
									settings={adaptedSettings}
								/>
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
