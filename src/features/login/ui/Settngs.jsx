import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {
	FormControlLabel,
	IconButton,
	InputAdornment,
	Menu,
	Stack,
	Switch,
	TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';

const NumberField = ({ label, value, onChange, onBlur, unit }) => (
	<TextField
		slotProps={{
			input: {
				endAdornment: (
					<InputAdornment position="end">{unit}</InputAdornment>
				),
			},
		}}
		sx={{ maxWidth: '185px' }}
		label={label}
		variant="standard"
		size="small"
		value={value}
		onChange={onChange}
		onBlur={onBlur}
	/>
);

const DelaySettings = ({
	minDelay,
	maxDelay,
	onMinChange,
	onMaxChange,
	onMinBlur,
	onMaxBlur,
}) => (
	<Stack
		direction="row"
		gap={2}
		sx={{ maxWidth: '185px' }}
	>
		<NumberField
			label="Min cooldown"
			value={minDelay}
			onChange={onMinChange}
			onBlur={onMinBlur}
			unit="sec"
		/>
		<NumberField
			label="Max cooldown"
			value={maxDelay}
			onChange={onMaxChange}
			onBlur={onMaxBlur}
			unit="sec"
		/>
	</Stack>
);

const Settings = ({ settings, onSettingsChange }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [inputMinDelay, setInputMinDelay] = useState(
		String(settings.delay.min),
	);
	const [inputMaxDelay, setInputMaxDelay] = useState(
		String(settings.delay.max),
	);
	const [inputThreads, setInputThreads] = useState(String(settings.threads));

	const openMenu = Boolean(anchorEl);
	const shuffle = useMemo(() => settings.shuffle, [settings]);

	const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
	const handleMenuClose = () => setAnchorEl(null);

	const handleInputChange = (setter) => (event) => setter(event.target.value);

	const handleMinDelayBlur = () => {
		const minDelay = Math.max(
			1,
			Number(inputMinDelay) || settings.delay.min,
		);
		const maxDelay = Math.max(minDelay + 30, settings.delay.max);

		onSettingsChange((prev) => ({
			...prev,
			delay: { min: minDelay, max: maxDelay },
		}));

		setInputMinDelay(String(minDelay));
		setInputMaxDelay(String(maxDelay));
	};

	const handleMaxDelayBlur = () => {
		const maxDelay = Math.max(
			settings.delay.min,
			Number(inputMaxDelay) || settings.delay.max,
		);

		onSettingsChange((prev) => ({
			...prev,
			delay: { ...prev.delay, max: maxDelay },
		}));

		setInputMaxDelay(String(maxDelay));
	};

	const handleThreadsBlur = () => {
		const threads = Math.max(1, Number(inputThreads) || settings.threads);

		onSettingsChange((prev) => ({ ...prev, threads }));
		setInputThreads(String(threads));
	};

	const handleShuffleChange = (_event, newShuffle) => {
		onSettingsChange((prev) => ({ ...prev, shuffle: newShuffle }));
	};

	return (
		<>
			<IconButton
				sx={{ position: 'absolute', top: 12, right: 12 }}
				aria-label="settings"
				aria-controls={openMenu ? 'settings-menu' : undefined}
				aria-expanded={openMenu ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleMenuOpen}
			>
				<SettingsRoundedIcon />
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleMenuClose}
			>
				<Stack
					p={2}
					alignItems="start"
					gap={1}
				>
					<NumberField
						label="Threads"
						value={inputThreads}
						onChange={handleInputChange(setInputThreads)}
						onBlur={handleThreadsBlur}
						unit="threads"
					/>

					<FormControlLabel
						control={
							<Switch
								checked={shuffle}
								onChange={handleShuffleChange}
							/>
						}
						label="Shuffle"
					/>

					<DelaySettings
						minDelay={inputMinDelay}
						maxDelay={inputMaxDelay}
						onMinChange={handleInputChange(setInputMinDelay)}
						onMaxChange={handleInputChange(setInputMaxDelay)}
						onMinBlur={handleMinDelayBlur}
						onMaxBlur={handleMaxDelayBlur}
					/>
				</Stack>
			</Menu>
		</>
	);
};

export default Settings;
