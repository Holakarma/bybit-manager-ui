import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {
	FormControlLabel,
	IconButton,
	InputAdornment,
	Menu,
	Stack,
	Switch,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';
import { useMemo, useState } from 'react';

const LoginSettings = ({ settings, onSettingsChange }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);
	const [inputValue, setInputValue] = useState(String(settings.delay));

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const order = useMemo(() => settings.order, [settings]);
	const shuffle = useMemo(() => settings.shuffle, [settings]);

	const handleOrderChange = (_event, newOrder) => {
		if (newOrder !== null) {
			onSettingsChange((prev) => ({ ...prev, order: newOrder }));
		}
	};
	const handleDelayChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleDelayBlur = () => {
		const parsedDelay = Number(inputValue) || 500;
		const delay = parsedDelay > 0 ? parsedDelay : 500;
		onSettingsChange((prev) => ({
			...prev,
			delay,
		}));
		setInputValue(String(delay));
	};

	const handleShuffleChange = (_event, newShuffle) => {
		onSettingsChange((prev) => ({ ...prev, shuffle: newShuffle }));
	};

	return (
		<>
			<IconButton
				sx={{ position: 'absolute', top: 12, right: 12 }}
				aria-label="more"
				id="long-button"
				aria-controls={openMenu ? 'long-menu' : undefined}
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
					gap={2}
				>
					<ToggleButtonGroup
						color="primary"
						value={order}
						exclusive
						onChange={handleOrderChange}
						size="small"
					>
						<ToggleButton value="parallel">Parallel</ToggleButton>
						<ToggleButton value="сonsistently">
							Consistently
						</ToggleButton>
					</ToggleButtonGroup>

					{order === 'сonsistently' ? (
						<Stack gap={1}>
							<FormControlLabel
								control={
									<Switch
										checked={shuffle}
										onChange={handleShuffleChange}
									/>
								}
								label="Shuffle"
							/>
							<TextField
								slotProps={{
									input: {
										endAdornment: (
											<InputAdornment position="end">
												sec
											</InputAdornment>
										),
									},
								}}
								sx={{ maxWidth: '185px' }}
								label="Delay"
								variant="standard"
								size="small"
								value={inputValue}
								onChange={handleDelayChange}
								onBlur={handleDelayBlur}
							/>
						</Stack>
					) : null}
				</Stack>
			</Menu>
		</>
	);
};

export default LoginSettings;
