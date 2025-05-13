import AvTimerRoundedIcon from '@mui/icons-material/AvTimerRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
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
	ListSubheader,
	Switch,
	TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { TASK_SETTINGS_CONFIG_NAME } from 'shared/model/app-config/consts';

const NumberField = ({ unit, sx, ...props }) => (
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
		type="number"
		variant="standard"
		size="small"
	/>
);

const TaskSettings = ({ control, name, watch, errors, trigger }) => {
	const delay = watch(`${TASK_SETTINGS_CONFIG_NAME}.delay`);

	return (
		<List
			subheader={<ListSubheader>Tasks completion settings</ListSubheader>}
		>
			<ListItem disablePadding>
				<ListItemButton disableTouchRipple>
					<ListItemIcon>
						<SafetyDividerRoundedIcon fontSize="large" />
					</ListItemIcon>

					<Controller
						name={`${name}.threads`}
						control={control}
						render={({ field }) => (
							<FormGroup sx={{ width: '100%' }}>
								<FormControlLabel
									labelPlacement="start"
									sx={{
										justifyContent: 'space-between',
										flexGrow: 1,
									}}
									control={
										<NumberField
											value={field.value}
											onChange={(e) =>
												field.onChange(
													Number(e.target.value),
												)
											}
											error={!!errors?.threads}
										/>
									}
									label="Threads"
								/>
							</FormGroup>
						)}
					/>
				</ListItemButton>
			</ListItem>

			<ListItem disablePadding>
				<Controller
					name={`${name}.shuffle`}
					control={control}
					render={({ field }) => (
						<ListItemButton
							onClick={() => field.onChange(!field.value)}
							disableRipple
						>
							<ListItemIcon>
								<ShuffleRoundedIcon fontSize="large" />
							</ListItemIcon>

							<ListItemText primary="Shuffle" />

							<Switch
								checked={field.value}
								value="shuffle"
							/>
						</ListItemButton>
					)}
				/>
			</ListItem>

			<ListItem disablePadding>
				<Controller
					name={`${name}.prelogin`}
					control={control}
					render={({ field }) => (
						<ListItemButton
							onClick={() => field.onChange(!field.value)}
							disableRipple
						>
							<ListItemIcon>
								<LoginRoundedIcon fontSize="large" />
							</ListItemIcon>

							<ListItemText primary="Prelogin" />

							<Switch
								checked={field.value}
								value="prelogin"
							/>
						</ListItemButton>
					)}
				/>
			</ListItem>

			<ListItem disablePadding>
				<Controller
					name={`${name}.delay`}
					control={control}
					render={({ field }) => (
						<ListItemButton
							onClick={() => {
								field.onChange({
									enabled: !field.value.enabled,
									min: 60,
									max: 90,
								});
							}}
							disableRipple
						>
							<ListItemIcon>
								<AvTimerRoundedIcon fontSize="large" />
							</ListItemIcon>

							<ListItemText primary="Delay" />

							<Switch
								checked={field.value.enabled}
								value="delay"
							/>
						</ListItemButton>
					)}
				/>
			</ListItem>

			<Collapse
				in={delay.enabled}
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
							alignItems: 'start',
							display: 'flex',
							gap: 2,
						}}
					>
						<Controller
							name={`${name}.delay.min`}
							control={control}
							render={({ field }) => (
								<NumberField
									value={field.value}
									onChange={(e) => {
										field.onChange(Number(e.target.value));
										trigger(`${name}.delay.max`);
									}}
									unit="sec"
									disabled={!delay.enabled}
									sx={{ maxWidth: '160px' }}
									error={Boolean(errors?.delay.min)}
									helperText={errors?.delay.min?.message}
								/>
							)}
						/>
						-
						<Controller
							name={`${name}.delay.max`}
							control={control}
							render={({ field }) => (
								<NumberField
									value={field.value}
									onChange={(e) =>
										field.onChange(Number(e.target.value))
									}
									unit="sec"
									disabled={!delay.enabled}
									sx={{ maxWidth: '160px' }}
									error={Boolean(errors?.delay.max)}
									helperText={errors?.delay.max?.message}
								/>
							)}
						/>
					</ListItem>
				</List>
			</Collapse>
		</List>
	);
};

export default TaskSettings;
