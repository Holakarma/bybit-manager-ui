import { Box, Paper, Stack, Typography } from '@mui/material';

const ImportPage = () => {
	return (
		<Stack
			gap={4}
			flexGrow={1}
		>
			<Typography variant="H3">Import</Typography>
			<Paper sx={{ flexGrow: 1 }}>
				<Box p={3}>Import accounts feature will be here soon...</Box>
			</Paper>
		</Stack>
	);
};

export default ImportPage;
