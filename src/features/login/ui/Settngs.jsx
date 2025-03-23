import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
	InputAdornment,
	Stack,
	TextField,
	ToggleButton,
	Tooltip,
	Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

const NumberField = ({ label, value, onChange, onBlur, unit, ...props }) => (
	<TextField
		{...props}
		slotProps={{
			input: {
				endAdornment: (
					<InputAdornment position="end">{unit}</InputAdornment>
				),
			},
		}}
		sx={{ maxWidth: '75px' }}
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
	<Stack>
		<Tooltip title="Generate random delay between actions">
			<Typography
				variant="Caption"
				color="text.secondary"
			>
				Delay interval
			</Typography>
		</Tooltip>
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
			/>
			-
			<NumberField
				value={maxDelay}
				onChange={onMaxChange}
				onBlur={onMaxBlur}
				unit="sec"
			/>
		</Stack>
	</Stack>
);

const Settings = ({ settings, onSettingsChange }) => {
	const [inputMinDelay, setInputMinDelay] = useState(
		String(settings.delay.min),
	);
	const [inputMaxDelay, setInputMaxDelay] = useState(
		String(settings.delay.max),
	);
	const [inputThreads, setInputThreads] = useState(String(settings.threads));

	const shuffle = useMemo(() => settings.shuffle, [settings]);

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

	const handleShuffleChange = (_event) => {
		onSettingsChange((prev) => ({ ...prev, shuffle: !prev.shuffle }));
	};

	return (
		<Stack
			alignItems="start"
			gap={2}
			width="100%"
			minWidth="350px"
			direction="row"
			paddingBlock={2}
		>
			<Stack
				direction="row"
				gap={2}
				justifyContent="space-between"
			>
				<NumberField
					label="Threads"
					value={inputThreads}
					onChange={handleInputChange(setInputThreads)}
					onBlur={handleThreadsBlur}
				/>

				<Tooltip title="Shuffle accounts">
					<ToggleButton
						size="small"
						value="shuffle"
						selected={shuffle}
						onChange={handleShuffleChange}
					>
						<ShuffleIcon />
					</ToggleButton>
				</Tooltip>
			</Stack>

			<DelaySettings
				minDelay={inputMinDelay}
				maxDelay={inputMaxDelay}
				onMinChange={handleInputChange(setInputMinDelay)}
				onMaxChange={handleInputChange(setInputMaxDelay)}
				onMinBlur={handleMinDelayBlur}
				onMaxBlur={handleMaxDelayBlur}
			/>
		</Stack>
	);
};

export default Settings;
