import {
	Box,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Switch,
	Tab,
	Tabs,
	TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

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
	const [tab, setTab] = useState(0);
	const handleChange = (_event, newValue) => {
		setTab(newValue);
	};

	const coin = useMemo(() => settings.coin, [settings]);
	const chainType = useMemo(() => settings.chainType, [settings]);
	const universal = useMemo(() => settings.universal, [settings]);
	const remark = useMemo(() => settings.remark, [settings]);
	const verify = useMemo(() => settings.verify, [settings]);

	const handleVerifyChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			verify: !prev.verify,
		}));
	};
	const handleCoinChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			coin: event.target.value,
		}));
	};
	const handleRemarkChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			remark: event.target.value,
		}));
	};
	const handleChainTypeChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			chainType: event.target.value,
		}));
	};
	const handleUniversalChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			universal: !prev.universal,
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

	return (
		<Stack>
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
					<Stack
						gap={1}
						justifyContent="end"
						alignItems="end"
					>
						<FormControl
							fullWidth
							size="small"
						>
							<InputLabel id="coin-select-label">Coin</InputLabel>
							<Select
								disabled={universal}
								labelId="coin-select-label"
								id="coin-select"
								value={coin}
								label="Coin"
								onChange={handleCoinChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>

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

					<FormControl
						fullWidth
						size="small"
					>
						<InputLabel id="chainType-select-label">
							Chain type
						</InputLabel>
						<Select
							labelId="chainType-select-label"
							id="chainType-select"
							value={chainType}
							label="chainType"
							onChange={handleChainTypeChange}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>

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
				</Stack>
			</CustomTabPanel>
			<CustomTabPanel
				value={tab}
				index={1}
			>
				Item Two
			</CustomTabPanel>
		</Stack>
	);
};

export default WhiteListParams;
