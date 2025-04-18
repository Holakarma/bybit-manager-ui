import { Grid2, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const VerifyingSettings = ({
	control,
	name,
	emailError,
	totpError,
	emailHelperText,
	totpHelperText,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Grid2
					container
					spacing={2}
				>
					<Grid2 size={4}>
						<Typography>Verify attempts</Typography>
					</Grid2>
					<Grid2 size={4}>
						<TextField
							type="number"
							variant="outlined"
							fullWidth
							size="small"
							label="Email"
							value={field.value.email}
							onChange={(e) =>
								field.onChange({
									...field.value,
									email: Number(e.target.value),
								})
							}
							error={emailError}
							helperText={emailHelperText}
						/>
					</Grid2>
					<Grid2 size={4}>
						<TextField
							type="number"
							variant="outlined"
							size="small"
							label="TOTP"
							fullWidth
							value={field.value.totp}
							onChange={(e) =>
								field.onChange({
									...field.value,
									totp: Number(e.target.value),
								})
							}
							error={totpError}
							helperText={totpHelperText}
						/>
					</Grid2>
				</Grid2>
			)}
		/>
	);
};

export default VerifyingSettings;
