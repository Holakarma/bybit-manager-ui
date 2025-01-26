import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

const GroupSelect = () => {
	const [age, setAge] = useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<FormControl
			size="small"
			fullWidth
		>
			<InputLabel id="demo-simple-select-filled-label">Groups</InputLabel>
			<Select
				labelId="demo-simple-select-filled-label"
				id="demo-simple-select-filled"
				value={age}
				onChange={handleChange}
			>
				<MenuItem value="">
					<em>All</em>
				</MenuItem>
				<MenuItem value={10}>Success</MenuItem>
				<MenuItem value={20}>Need to KYC</MenuItem>
				<MenuItem value={30}>Third</MenuItem>
			</Select>
		</FormControl>
	);
};

export default GroupSelect;
