import { Box, Paper, Stack, Typography } from '@mui/material';
import { ImportAccountTable } from 'features/import-accounts';
import { ImportFile } from 'widgets/import-file';

const ImportPage = () => {
	return (
		<Stack
			gap={4}
			flexGrow={1}
		>
			<Typography variant="H3">Import accounts</Typography>
			<Paper sx={{ flexGrow: 1 }}>
				<Box p={3}>
					<ImportFile />
					<ImportAccountTable />
				</Box>
			</Paper>
		</Stack>
	);
};

export default ImportPage;
