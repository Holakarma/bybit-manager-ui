import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
	Checkbox,
	IconButton,
	TableCell,
	TableRow,
	TextField,
} from '@mui/material';
import { useState } from 'react';

const ParamRow = ({ param, onChange, error, ...props }) => {
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
				<TextField
					defaultValue={param.value}
					name="value"
					onChange={handleChange}
					onBlur={handleParamChange}
					size="small"
					placeholder="value"
					fullWidth
					variant="standard"
					slotProps={{ input: { disableUnderline: true } }}
					error={error}
				/>
			</TableCell>
			<TableCell align="center">
				<Checkbox
					disabled={!tmpParam.key || !tmpParam.value}
					checked={tmpParam.active}
					onChange={handleActiveChange}
				/>
			</TableCell>
			<TableCell align="center">
				<IconButton
					onClick={handleDelete}
					disabled={!tmpParam.key || !tmpParam.value}
				>
					<DeleteRoundedIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default ParamRow;
