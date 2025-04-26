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

// @FIXME: hardcode default chains
const defaultChains = [
	{
		symbol: 'BTC',
		full_name: 'Bitcoin',
		chain_type: 'BTC',
		chain_full_name: 'BTC',
		trading_balance: 0,
		funding_balance: 0,
		total_balance: '0',
		precision: 8,
		has_memo: false,
		icon_url:
			'https://s1.bycsi.com/app/assets/token/d9c8c35b4223b50d9773d7d5294d019f.svg',
		icon_night_url:
			'https://s1.bycsi.com/app/assets/token/62942131f968981af06a885a79f864ba.svg',
	},
	{
		symbol: 'ETH',
		full_name: 'Ethereum',
		chain_type: 'ETH',
		chain_full_name: 'Ethereum (ERC20)',
		trading_balance: 0,
		funding_balance: 0,
		total_balance: '0',
		precision: 8,
		has_memo: false,
		icon_url:
			'https://s1.bycsi.com/app/assets/token/8f413d7ed51fa4bc3d206d6abf41f4dc.svg',
		icon_night_url:
			'https://s1.bycsi.com/app/assets/token/35a48e2a91411dcdb00c7fdd443676a9.svg',
	},
];

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

const WhiteListParams = ({ settings, onSettingsChange }) => {
	const defaultAccount = useDefaultAccount.use.defaultAccountId();
	const queryClient = useQueryClient();
	const {
		data: coinsChains,
		isFetching,
		isError,
	} = useCoinsChains(defaultAccount);

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
		},
		[onSettingsChange],
	);

	useEffect(() => {
		if (coins && !coin.coin) {
			handleCoinChange(
				null,
				coins.find((coin) => coin.coin === 'USDT') || { coin: '' },
			);
		}
	}, [coins, coin, handleCoinChange]);

	/* universal */
	const universal = useMemo(() => settings.universal, [settings]);
	const handleUniversalChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			universal: !prev.universal,
		}));
	};

	/* chain */
	const chain = useMemo(() => settings.chain, [settings]);
	const handleChainChange = useCallback(
		(_event, newChain) => {
			const newSettings = { chain: newChain };

			if (newChain.has_memo) {
				newSettings.memo = '';
			}

			onSettingsChange((prev) => ({
				...prev,
				...newSettings,
			}));
		},
		[onSettingsChange],
	);

	const chains = useMemo(() => {
		if (coin && coinsChains) {
			let newChains = [];
			if (universal) {
				newChains = Object.values(allChains);
			} else {
				newChains = Object.values(coinsChains[coin.coin]);
			}

			return newChains;
		}

		return null;
	}, [coin, coinsChains, universal, allChains]);

	useEffect(() => {
		if (coinsChains) {
			if (coin && !universal) {
				const newChains = Object.values(coinsChains[coin.coin]);
				handleChainChange(null, newChains[0]);
			} else {
				handleChainChange(null, defaultChains[0]);
			}
		}
	}, [coin, coinsChains, handleChainChange, universal]);

	/* Tabs */
	const [tab, setTab] = useState(0);
	const handleChange = (_event, newValue) => {
		setTab(newValue);
	};

	const remark = useMemo(() => settings.remark, [settings]);
	const handleRemarkChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			remark: event.target.value,
		}));
	};

	const memo = useMemo(() => settings.memo, [settings]);
	const handleMemoChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			memo: event.target.value,
		}));
	};

	const verify = useMemo(() => settings.verify, [settings]);
	const handleVerifyChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			verify: !prev.verify,
		}));
	};

	const setAsDefault = useMemo(() => settings.setAsDefault, [settings]);
	const handleSetAsDefaultChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			setAsDefault: !prev.setAsDefault,
		}));
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
		return <Typography>Error while getting coins-chains</Typography>;
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
												sx={{ width: 24, height: 24 }}
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
									labelPlacement="start"
									sx={{ marginRight: 0 }}
								/>
							</FormGroup>
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
								size="small"
								label="Memo"
								variant="outlined"
								value={memo}
								onChange={handleMemoChange}
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
							src="public/assets/video/batman-placeholder.MP4"
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
