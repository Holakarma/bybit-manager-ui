import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import {
	Avatar,
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	IconButton,
	Stack,
	Switch,
	Tab,
	Tabs,
	TextField,
	Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useDefaultAccount } from 'entities/account';
import { useCoinsChains } from 'entities/coins-chains';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ChainPicker from './ChainPicker';
import CoinsPicker from './CoinsPicker';
import videoUrl from '/public/assets/video/batman-placeholder.mp4';

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`whitelist-settings-tabpanel-${index}`}
			aria-labelledby={`whitelist-settings-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ paddingBlock: 3 }}>{children}</Box>}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `whitelist-settings-tab-${index}`,
		'aria-controls': `whitelist-settings-tabpanel-${index}`,
	};
}

const WhiteListParams = ({ settings, onSettingsChange, onError, ids }) => {
	const defaultAccount = useDefaultAccount.use.defaultAccountId();
	const queryClient = useQueryClient();
	const {
		data: coinsChains,
		isFetching,
		isError,
	} = useCoinsChains(defaultAccount);

	const chain = useMemo(() => settings.chain, [settings.chain]);
	const handleChainChange = useCallback(
		(_event, newChain) => {
			onSettingsChange((prev) => ({
				...prev,
				chain: newChain,
			}));
		},
		[onSettingsChange],
	);

	/* universal */
	const universal = useMemo(() => settings.universal, [settings.universal]);
	const handleUniversalChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			universal: !prev.universal,
		}));

		const newChains = universal
			? Object.values(coinsChains[coin.coin])
			: Object.values(allChains);
		handleChainChange(null, newChains[0]);
	};

	/* coins */
	const [coins, allChains] = useMemo(() => {
		if (coinsChains) {
			const coins = [];
			const allChains = {};

			for (var [coin, chains] of Object.entries(coinsChains)) {
				const icon_night_url =
					Object.values(chains)[0].icon_night_url || '';

				Object.assign(allChains, chains);
				coins.push({ coin, icon_night_url });
			}

			return [coins, allChains];
		}
		return [null, null];
	}, [coinsChains]);

	const coin = useMemo(() => settings.coin, [settings]);
	const handleCoinChange = useCallback(
		(_event, newValue) => {
			onSettingsChange((prev) => {
				return {
					...prev,
					coin: newValue,
				};
			});

			if (coinsChains) {
				const newChains = universal
					? Object.values(allChains)
					: Object.values(coinsChains[newValue.coin]);

				handleChainChange(null, newChains[0]);
			}
		},
		[
			onSettingsChange,
			allChains,
			coinsChains,
			handleChainChange,
			universal,
		],
	);

	useEffect(() => {
		if (coins && !coin.coin) {
			handleCoinChange(
				null,
				coins.find((coin) => coin.coin === 'USDT') || { coin: '' },
			);
		}
	}, [coins, coin, handleCoinChange]);

	const chains = useMemo(() => {
		if (coin.coin && coinsChains) {
			let newChains = [];
			if (universal) {
				newChains = Object.values(allChains);
			} else {
				newChains = Object.values(coinsChains[coin.coin]);
			}

			return newChains;
		}

		return null;
	}, [coin.coin, coinsChains, universal, allChains]);

	useEffect(() => {
		if (coinsChains && !chain.chain_full_name) {
			const newChains =
				coin.coin && !universal
					? Object.values(coinsChains[coin.coin])
					: Object.values(allChains);
			handleChainChange(null, newChains[0]);
		}
	}, [
		coin.coin,
		coinsChains,
		handleChainChange,
		universal,
		allChains,
		chain.chain_full_name,
	]);

	/* Tabs */
	const [tab, setTab] = useState(0);
	const handleChange = (_event, newValue) => {
		setTab(newValue);
	};

	/* other settings */
	const remark = useMemo(() => settings.remark, [settings.remark]);
	const handleRemarkChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			remark: event.target.value,
		}));
	};

	const verify = useMemo(() => settings.verify, [settings.verify]);
	const handleVerifyChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			verify: !prev.verify,
		}));
	};

	const setAsDefault = useMemo(
		() => settings.setAsDefault,
		[settings.setAsDefault],
	);
	const handleSetAsDefaultChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			setAsDefault: !prev.setAsDefault,
		}));
	};

	const memo = useMemo(() => settings.memo.join('\n'), [settings.memo]);
	const [memoTyping, setMemoTyping] = useState(memo);
	const handleMemoTyping = (e) => {
		setMemoTyping(e.target.value);
	};
	const handleMemoChange = (event) => {
		const memoValue = event.target.value
			.split('\n')
			.map((memo) => memo.trim())
			.filter(Boolean);
		onSettingsChange((prev) => ({
			...prev,
			memo: memoValue,
		}));
		setMemoTyping(memoValue.join('\n'));
	};

	const addresses = useMemo(
		() => settings.addresses.join('\n'),
		[settings.addresses],
	);
	const [addressesTyping, setAddressesTyping] = useState(addresses);
	const handleAddressesTyping = (e) => {
		setAddressesTyping(e.target.value);
	};
	const handleAddressesChange = (event) => {
		const addressesValue = event.target.value
			.split('\n')
			.map((address) => address.trim())
			.filter(Boolean);
		onSettingsChange((prev) => ({
			...prev,
			addresses: addressesValue,
		}));
		setAddressesTyping(addressesValue.join('\n'));
	};

	if (isError) {
		if (onError) {
			onError();
		}
		return (
			<Typography>
				Error while getting coins-chains. Check session on your default
				account.
			</Typography>
		);
	}

	if (!defaultAccount) {
		return <Typography>You should set default account first</Typography>;
	}

	return (
		<Box
			height="100%"
			position="relative"
		>
			<Stack
				position="absolute"
				top={0}
				right={0}
				bottom={0}
				left={0}
				overflow="auto"
				paddingRight={1}
			>
				<Tabs
					value={tab}
					onChange={handleChange}
				>
					<Tab
						label="On-chain Withdrawal"
						{...a11yProps(0)}
					/>
					<Tab
						label="Internal Transfer"
						{...a11yProps(1)}
					/>
				</Tabs>

				<CustomTabPanel
					value={tab}
					index={0}
				>
					<Stack gap={3}>
						<Stack gap={1}>
							<FormGroup size="small">
								<FormControlLabel
									control={
										<Switch
											checked={universal}
											onChange={handleUniversalChange}
											value="universal"
										/>
									}
									label="Save as universal wallet address"
									sx={{ marginLeft: 0 }}
								/>
							</FormGroup>

							{!universal && (
								<Stack
									direction="row"
									gap={1}
									width="100%"
								>
									<CoinsPicker
										disabled={universal}
										options={coins || []}
										loading={isFetching}
										onChange={handleCoinChange}
										startAdornment={
											coin.icon_night_url ? (
												<Avatar
													src={coin.icon_night_url}
													sx={{
														width: 24,
														height: 24,
													}}
												/>
											) : null
										}
										value={coin}
									/>

									<IconButton
										onClick={() =>
											queryClient.invalidateQueries({
												queryKey: ['coins-chains'],
											})
										}
										disabled={isFetching || universal}
									>
										<RefreshRoundedIcon />
									</IconButton>
								</Stack>
							)}
						</Stack>
						<TextField
							multiline
							minRows={3}
							maxRows={5}
							value={addressesTyping}
							onChange={handleAddressesTyping}
							onBlur={handleAddressesChange}
							size="small"
							label="Addresses"
							variant="outlined"
							helperText={`${addressesTyping ? addressesTyping.split('\n').length : 0}/${ids.length}`}
							error={
								addressesTyping
									? addressesTyping.split('\n').length !==
										ids.length
									: true
							}
						/>

						<ChainPicker
							options={chains || []}
							loading={isFetching}
							onChange={handleChainChange}
							value={chain}
							disabled={!chains || chains.length === 1}
						/>

						{chain.has_memo && (
							<TextField
								multiline
								minRows={3}
								maxRows={5}
								size="small"
								label="Memo"
								variant="outlined"
								value={memoTyping}
								onChange={handleMemoTyping}
								onBlur={handleMemoChange}
							/>
						)}

						<TextField
							size="small"
							label="Remark"
							variant="outlined"
							value={remark}
							onChange={handleRemarkChange}
						/>

						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={verify}
										onChange={handleVerifyChange}
									/>
								}
								sx={{ marginLeft: 0 }}
								label="No verification needed for these addresses next time"
							/>
						</FormGroup>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={setAsDefault}
										onChange={handleSetAsDefaultChange}
									/>
								}
								sx={{ marginLeft: 0 }}
								label="Set as default address"
							/>
						</FormGroup>
					</Stack>
				</CustomTabPanel>
				<CustomTabPanel
					value={tab}
					index={1}
				>
					<video
						width="100%"
						loop
						muted
						autoPlay
						style={{ borderRadius: '16px' }}
					>
						<source
							src={videoUrl}
							type="video/mp4"
						/>
						Browser does not support video
					</video>
				</CustomTabPanel>
			</Stack>
		</Box>
	);
};

export default WhiteListParams;
