import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
	Checkbox,
	IconButton,
	Stack,
	TableCell,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import { useState } from 'react';

const ParamRow = ({ param, onChange, error, hiddenValueLabel, ...props }) => {
	const [tmpParam, setTmpParam] = useState(param);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTmpParam((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleParamChange = () => {
		onChange(tmpParam);
		setEditMode(false);
	};

	const handleDelete = () => {
		onChange({});
	};

	const handleActiveChange = (event) => {
		const newParam = {
			...tmpParam,
			active: event.target.checked,
		};

		setTmpParam(newParam);
		onChange(newParam);
	};

	const [editMode, setEditMode] = useState(false);

	return (
		<TableRow {...props}>
			<TableCell>
				<TextField
					defaultValue={param.key}
					name="key"
					onChange={handleChange}
					onBlur={handleParamChange}
					size="small"
					placeholder="key"
					fullWidth
					variant="standard"
					slotProps={{ input: { disableUnderline: true } }}
					error={error}
				/>
			</TableCell>
			<TableCell>
				{hiddenValueLabel && hiddenValueLabel(param) && !editMode ? (
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography>{hiddenValueLabel(param)}</Typography>
						<IconButton onClick={() => setEditMode(true)}>
							<EditRoundedIcon />
						</IconButton>
					</Stack>
				) : (
					<TextField
						defaultValue={param.value}
						name="value"
						onChange={handleChange}
						onBlur={handleParamChange}
						size="small"
						placeholder={param.key ? 'empty value' : 'value'}
						fullWidth
						variant="standard"
						slotProps={{ input: { disableUnderline: true } }}
						error={error}
					/>
				)}
			</TableCell>
			<TableCell align="center">
				<Checkbox
					disabled={!tmpParam.key}
					checked={tmpParam.active}
					onChange={handleActiveChange}
				/>
			</TableCell>
			<TableCell align="center">
				<IconButton
					onClick={handleDelete}
					disabled={!tmpParam.key && !tmpParam.value}
				>
					<DeleteRoundedIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default ParamRow;
