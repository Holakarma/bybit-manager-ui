import { TableCell, TableRow, TextField } from '@mui/material';
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
		</TableRow>
	);
};

export default ParamRow;
