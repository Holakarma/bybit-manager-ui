import { Box, Paper, Stack, Typography } from '@mui/material';
import { ImportAccountTable } from 'features/import-accounts';
import { ImportFile } from 'widgets/import-file';

const ImportPage = () => {
	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxHeight="100%"
		>
			<Typography variant="H3">Import accounts</Typography>
			<Paper sx={{ flexGrow: 1, overflow: 'auto' }}>
				<Box p={3}>
					<ImportFile />
					<ImportAccountTable sx={{ marginTop: 2 }} />
				</Box>
			</Paper>
		</Stack>
	);
};

export default ImportPage;
