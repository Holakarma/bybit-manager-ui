import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import SafetyDividerRoundedIcon from '@mui/icons-material/SafetyDividerRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import {
	Collapse,
	FormControlLabel,
	FormGroup,
	InputAdornment,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Switch,
	TextField,
} from '@mui/material';
import { useMemo, useState } from 'react';

export const NumberField = ({
	label,
	value,
	onChange,
	onBlur,
	unit,
	sx,
	...props
}) => (
	<TextField
		{...props}
		slotProps={{
			input: {
				endAdornment: (
					<InputAdornment position="end">{unit}</InputAdornment>
				),
			},
		}}
		sx={{ maxWidth: '120px', marginInline: 1, ...sx }}
		label={label}
		type="number"
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
	disabled,
}) => (
	<Stack
		direction="row"
		gap={2}
		sx={{ maxWidth: '100%' }}
	>
		<NumberField
			value={minDelay}
			onChange={onMinChange}
			onBlur={onMinBlur}
			unit="sec"
			disabled={disabled}
			sx={{ maxWidth: '160px' }}
		/>
		-
		<NumberField
			value={maxDelay}
			onChange={onMaxChange}
			onBlur={onMaxBlur}
			unit="sec"
			disabled={disabled}
			sx={{ maxWidth: '160px' }}
		/>
	</Stack>
);

const TaskSettingsPrelogin = ({ settings, onSettingsChange }) => {
	const [inputMinDelay, setInputMinDelay] = useState(
		String(settings.delay.min),
	);
	const [inputMaxDelay, setInputMaxDelay] = useState(
		String(settings.delay.max),
	);
	const [inputThreads, setInputThreads] = useState(String(settings.threads));

	const shuffle = useMemo(() => settings.shuffle, [settings]);
	const delay = useMemo(() => settings.delay.enabled, [settings]);

	const handleInputChange = (setter) => (event) => setter(event.target.value);

	const handleMinDelayBlur = () => {
		const minDelay = Math.max(
			1,
			Number(inputMinDelay) || settings.delay.min,
		);
		const maxDelay = Math.max(minDelay + 30, settings.delay.max);

		onSettingsChange((prev) => ({
			...prev,
			delay: { ...prev.delay, min: minDelay, max: maxDelay },
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

	const handleShuffleChange = () => {
		onSettingsChange((prev) => ({ ...prev, shuffle: !prev.shuffle }));
	};

	const handleDelayChange = () => {
		onSettingsChange((prev) => ({
			...prev,
			delay: { ...prev.delay, enabled: !prev.delay.enabled },
		}));
	};

	return (
		<>
			<ListItem disablePadding>
				<ListItemButton disableTouchRipple>
					<ListItemIcon>
						<SafetyDividerRoundedIcon fontSize="large" />
					</ListItemIcon>
					<FormGroup sx={{ width: '100%' }}>
						<FormControlLabel
							labelPlacement="start"
							sx={{
								justifyContent: 'space-between',
								flexGrow: 1,
							}}
							control={
								<NumberField
									value={inputThreads}
									onChange={handleInputChange(
										setInputThreads,
									)}
									onBlur={handleThreadsBlur}
								/>
							}
							label="Threads"
						/>
					</FormGroup>
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<ListItemButton
					onClick={handleShuffleChange}
					disableRipple
				>
					<ListItemIcon>
						<ShuffleRoundedIcon fontSize="large" />
					</ListItemIcon>

					<ListItemText primary="Shuffle" />

					<Switch
						checked={shuffle}
						value="shuffle"
					/>
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<ListItemButton
					onClick={handleDelayChange}
					disableRipple
				>
					<ListItemIcon>
						<AvTimerRoundedIcon fontSize="large" />
					</ListItemIcon>

					<ListItemText
						primary="Delay"
						secondary="Generate random delay between accounts"
					/>

					<Switch
						checked={delay}
						value="delay"
					/>
				</ListItemButton>
			</ListItem>

			<Collapse
				in={delay}
				timeout="auto"
				unmountOnExit
			>
				<List
					component="div"
					disablePadding
				>
					<ListItem
						sx={{
							justifyContent: 'end',
							minHeight: '55px',
						}}
					>
						<DelaySettings
							minDelay={inputMinDelay}
							maxDelay={inputMaxDelay}
							onMinChange={handleInputChange(setInputMinDelay)}
							onMaxChange={handleInputChange(setInputMaxDelay)}
							onMinBlur={handleMinDelayBlur}
							onMaxBlur={handleMaxDelayBlur}
							disabled={!delay}
						/>
					</ListItem>
				</List>
			</Collapse>
		</>
	);
};

export default TaskSettingsPrelogin;
