import { InputAdornment, TextField } from '@mui/material';
import { forwardRef } from 'react';

const NumberField = forwardRef(function NumberField(
	{ unit, sx, ...props },
	ref,
) {
	return (
		<TextField
			ref={ref}
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
			{...props}
		/>
	);
});

export default NumberField;
