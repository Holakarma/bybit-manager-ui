import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const RequestTitle = ({ title, onChange }) => {
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [tempTitle, setTempTitle] = useState(title);

	const handleTitleSave = () => {
		setIsEditingTitle(false);

		const newTitle = tempTitle.trim();
		if (!newTitle) {
			handleTitleReset();
			return;
		}

		setTempTitle(newTitle);
		onChange(newTitle);
	};
	const handleTitleReset = () => {
		setIsEditingTitle(false);
		setTempTitle(title);
		onChange(title);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleTitleSave();
		}
		if (event.key === 'Escape') {
			handleTitleReset();
		}
	};

	useEffect(() => {
		setTempTitle(title);
	}, [title]);

	return isEditingTitle ? (
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
		<Box
			sx={{
				width: '100%',
				cursor: 'pointer',
				whiteSpace: 'nowrap',
				overflow: 'hidden',
			}}
		>
			<Typography
				sx={{
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					flexGrow: 1,
				}}
				variant="H5"
				onClick={() => setIsEditingTitle(true)}
			>
				{title}
			</Typography>
		</Box>
	);
};

export default RequestTitle;
