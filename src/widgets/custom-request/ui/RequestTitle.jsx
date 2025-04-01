import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

const RequestTitle = ({ title, onChange }) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [tempTitle, setTempTitle] = useState(title);

	const handleTitleSave = () => {
		setIsEditingTitle(false);
		onChange(tempTitle.trim());
	};
	const handleTitleReset = () => {
		setIsEditingTitle(false);
		onChange(title);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleTitleSave();
		}
		if (event.key === 'Escape') {
			setTempTitle(title);
			handleTitleReset();
		}
	};

	return (
		<Typography
			variant="H5"
			onClick={() => setIsEditingTitle(true)}
		>
			{isEditingTitle ? (
				<TextField
					value={tempTitle}
					onChange={(e) => setTempTitle(e.target.value)}
					onBlur={handleTitleSave}
					onKeyDown={handleKeyPress}
					autoFocus
					fullWidth
					size="small"
					variant="standard"
					slotProps={{ input: { disableUnderline: true } }}
					sx={{
						'& .MuiInputBase-input': {
							fontSize: '1.44rem',
							fontWeight: 400,
							padding: 0,
						},
					}}
				/>
			) : (
				title
			)}
		</Typography>
	);
};

export default RequestTitle;
