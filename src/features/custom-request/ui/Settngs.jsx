import AvTimerIcon from '@mui/icons-material/AvTimer';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
	Box,
	CircularProgress,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	ToggleButton,
	Tooltip,
	Typography,
} from '@mui/material';
import { useCustomRequests } from 'entities/custom-request';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import ROUTES from 'shared/config/routes';

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
	disabled,
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
				disabled={disabled}
				value={minDelay}
				onChange={onMinChange}
				onBlur={onMinBlur}
				unit="sec"
			/>
			-
			<NumberField
				disabled={disabled}
				value={maxDelay}
				onChange={onMaxChange}
				onBlur={onMaxBlur}
				unit="sec"
			/>
		</Stack>
	</Stack>
);

const Settings = ({
	settings,
	onSettingsChange,
	onRequestChange,
	requestId,
}) => {
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

	const { data: customRequests, isLoading, isError } = useCustomRequests();

	if (isLoading) {
		return (
			<Stack
				gap={2}
				padding={2}
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (isError) {
		return (
			<Stack
				gap={2}
				padding={2}
				justifyContent="center"
				alignItems="center"
			>
				<Typography
					variant="H5"
					color="error"
				>
					IndexedDB error
				</Typography>
			</Stack>
		);
	}

	return (
		<Stack
			gap={4}
			width="600px"
		>
			<Stack
				alignItems="start"
				gap={2}
				width="100%"
				direction="row"
				paddingTop={2}
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

					<Tooltip title="Enable delay">
						<ToggleButton
							size="small"
							value="delay"
							selected={delay}
							onChange={handleDelayChange}
						>
							<AvTimerIcon />
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
					disabled={!delay}
				/>
			</Stack>

			<FormControl fullWidth>
				<InputLabel id="request-select-label">
					Choose request
				</InputLabel>
				<Select
					labelId="request-select-label"
					value={requestId}
					onChange={(e) => onRequestChange(e.target.value)}
					variant="standard"
					disableUnderline
				>
					{customRequests.map((request) => (
						<MenuItem
							value={request.id}
							key={request.id}
						>
							<Stack
								direction="row"
								gap={1}
								alignItems="baseline"
								maxWidth={'600px'}
							>
								<Typography
									sx={{
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										flexGrow: 1,
									}}
									variant="body"
								>
									{request.title}
								</Typography>
								<Typography
									sx={{
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										flexGrow: 1,
									}}
									variant="caption"
									color="textSecondary"
								>
									{request.path}
								</Typography>
							</Stack>
						</MenuItem>
					))}
					<Box
						paddingInline={2}
						paddingBlock={1}
					>
						<Link
							to={ROUTES.REQUESTS}
							target="_blank"
						>
							<Typography color="textSecondary">
								Create new request
							</Typography>
						</Link>
					</Box>
				</Select>
			</FormControl>
		</Stack>
	);
};

export default Settings;
