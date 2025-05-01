import { InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { forwardRef } from 'react';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line react/display-name
const MethodSelect = forwardRef(({ value, onChange, ...props }, ref) => (
	<Select
		ref={ref}
		value={value}
		onChange={onChange}
		sx={{
			minWidth: 100,
		}}
		variant="standard"
		disableUnderline
		{...props}
	>
		<MenuItem value="GET">GET</MenuItem>
		<MenuItem value="POST">POST</MenuItem>
		<MenuItem value="PATCH">PATCH</MenuItem>
		<MenuItem value="DELETE">DELETE</MenuItem>
		<MenuItem value="OPTIONS">OPTIONS</MenuItem>
	</Select>
));

const PathController = ({ control, errors, onPaste }) => {
	return (
		<Controller
			name="path"
			control={control}
			rules={{
				required: 'Path is required',
			}}
			render={({ field }) => (
				<TextField
					{...field}
					label="Request"
					fullWidth
					onPaste={onPaste}
					sx={{ height: '100%' }}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">
									<Controller
										name="method"
										control={control}
										rules={{
											required: 'Method is required',
										}}
										render={({ field: methodField }) => (
											<MethodSelect {...methodField} />
										)}
									/>
								</InputAdornment>
							),
							placeholder: 'your/request/path',
						},
					}}
					error={!!errors.path}
					helperText={errors.path?.message}
				/>
			)}
		/>
	);
};

export default PathController;
