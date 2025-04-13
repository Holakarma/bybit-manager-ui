import { Grid2, Stack, TextField, Typography } from '@mui/material';

const VerifyingSettings = () => {
	return (
		<Grid2
			container
			spacing={2}
		>
			<Grid2 size={4}>
				<Stack
					height="100%"
					justifyContent="center"
				>
					<Typography>Verify attempts</Typography>
				</Stack>
			</Grid2>
			<Grid2 size={4}>
				<TextField
					type="number"
					variant="outlined"
					fullWidth
					size="small"
					label="Email"
				/>
			</Grid2>
			<Grid2 size={4}>
				<TextField
					type="number"
					variant="outlined"
					size="small"
					label="TOTP"
					fullWidth
				/>
			</Grid2>
		</Grid2>
	);
};

export default VerifyingSettings;
