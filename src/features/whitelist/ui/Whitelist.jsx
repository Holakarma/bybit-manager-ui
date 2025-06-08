import { useDefaultAccount } from 'entities/account';
import { taskSettingsDefaultConfig } from 'entities/app-settings';
import {
	CreateTask,
	TaskAccountsPage,
	TaskSettingsBase,
	TaskSettingsPage,
	TaskSettingsPrelogin,
	TOTPSetting,
	WhitelistSetting,
} from 'entities/task';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isCookieAlive } from 'shared/lib/session-cookies';
import { getTaskSettingsConfig } from 'shared/model/app-config';
import useAddWithdrawAddressesTask from '../api/addWhitelist';
import WhiteListParams from './WhiteListParams';
import WhitelistTable from './WhitelistTable';

const Whitelist = ({ children, onClose }) => {
	const defaultAccount = useDefaultAccount.use.defaultAccountId();
	const mutation = useAddWithdrawAddressesTask();

	const [settings, setSettings] = useState({
		...getTaskSettingsConfig(taskSettingsDefaultConfig),
		enable_totp: true,
		enable_whitelist: true,
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
		<CreateTask
			onClose={onClose}
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
							<TaskSettingsBase
								settings={settings}
								onSettingsChange={onSettingsChange}
							/>
							<TaskSettingsPrelogin
								settings={settings}
								onSettingsChange={onSettingsChange}
							/>
							<TOTPSetting
								settings={settings}
								onSettingsChange={onSettingsChange}
							/>
							<WhitelistSetting
								settings={settings}
								onSettingsChange={onSettingsChange}
							/>
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
									setErrorText('Error while getting chains')
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
					disabled: !ids.length || !settings.addresses.length,
				},
			]}
		>
			{children}
		</CreateTask>
	);
};

export default Whitelist;
