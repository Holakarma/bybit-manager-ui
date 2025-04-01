import { Grid2, Paper, Stack, Typography } from '@mui/material';
import { CustomRequest } from 'widgets/custom-request';

const RequestPage = () => {
	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxWidth="100%"
			// maxHeight="100%"
		>
			<Typography variant="H3">Requests</Typography>

			<Grid2
				container
				spacing={2}
				sx={{ flexGrow: 1 }}
			>
				<Grid2 size={3}>
					<Paper sx={{ height: '100%', padding: 2 }}>
						<Stack gap={2}>
							<Typography variant="H5">Your requests</Typography>
						</Stack>
					</Paper>
				</Grid2>
				<Grid2 size="grow">
					<Paper sx={{ height: '100%' }}>
						<Stack
							sx={{ height: '100%' }}
							gap={2}
							padding={2}
						>
							<CustomRequest flexGrow={1} />
						</Stack>
					</Paper>
				</Grid2>
			</Grid2>
		</Stack>
	);
};

export default RequestPage;
