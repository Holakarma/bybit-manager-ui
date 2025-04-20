import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import {
	FormControlLabel,
	FormGroup,
	InputAdornment,
	Stack,
	Switch,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

const NumberField = ({
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
		sx={{ maxWidth: '120px', ...sx }}
		label={label}
		type="number"
		variant="outlined"
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
	<Stack gap={1}>
		<Typography
			variant="Caption"
			color="text.secondary"
		>
			Delay interval
		</Typography>
		<Stack
			direction="row"
			gap={2}
			alignItems="center"
			sx={{ maxWidth: '100%' }}
		>
			<NumberField
				disabled={disabled}
				value={minDelay}
				onChange={onMinChange}
				onBlur={onMinBlur}
				unit="sec"
				sx={{ maxWidth: '160px' }}
			/>
			-
			<NumberField
				disabled={disabled}
				value={maxDelay}
				onChange={onMaxChange}
				onBlur={onMaxBlur}
				unit="sec"
				sx={{ maxWidth: '160px' }}
			/>
		</Stack>
	</Stack>
);

const TaskSettingsBase = ({ settings, onSettingsChange }) => {
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

	const handleShuffleChange = (_event) => {
		onSettingsChange((prev) => ({ ...prev, shuffle: !prev.shuffle }));
	};
	const handleDelayChange = (_event) => {
		onSettingsChange((prev) => ({
			...prev,
			delay: { ...prev.delay, enabled: !prev.delay.enabled },
		}));
	};

	return (
		<Stack
			justifyContent="center"
			gap={3}
			width="100%"
			paddingTop={2}
		>
			<Stack
				direction="row"
				gap={2}
				alignItems="center"
			>
				<NumberField
					value={inputThreads}
					onChange={handleInputChange(setInputThreads)}
					onBlur={handleThreadsBlur}
				/>
				<Typography>Threads</Typography>
			</Stack>

			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={shuffle}
							onChange={handleShuffleChange}
							value="shuffle"
						/>
					}
					label="Shuffle accounts"
				/>
			</FormGroup>

			<Stack gap={1}>
				<Stack
					direction="row"
					alignItems="center"
				>
					<FormGroup>
						<FormControlLabel
							control={
								<Switch
									checked={delay}
									onChange={handleDelayChange}
									value="delay"
								/>
							}
							label="Enable delay"
						/>
					</FormGroup>
					<Tooltip title="Generate random delay between accounts">
						<HelpOutlineRoundedIcon color="textSecondary" />
					</Tooltip>
				</Stack>

				{delay && (
					<DelaySettings
						minDelay={inputMinDelay}
						maxDelay={inputMaxDelay}
						onMinChange={handleInputChange(setInputMinDelay)}
						onMaxChange={handleInputChange(setInputMaxDelay)}
						onMinBlur={handleMinDelayBlur}
						onMaxBlur={handleMaxDelayBlur}
						disabled={!delay}
					/>
				)}
			</Stack>
		</Stack>
	);
};

export default TaskSettingsBase;
