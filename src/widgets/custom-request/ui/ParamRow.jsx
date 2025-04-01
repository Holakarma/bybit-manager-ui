import { TableCell, TableRow, TextField } from '@mui/material';
import { useState } from 'react';

const ParamRow = ({ onParamChange, param, ...props }) => {
	const [tmpParam, setTmpParam] = useState(param);

	const handleParamChange = () => {
		onParamChange(tmpParam);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTmpParam((prev) => ({
			...prev,
			[name]: value,
		}));
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
				/>
			</TableCell>
		</TableRow>
	);
};

export default ParamRow;
