import { Paper, Stack, Typography } from '@mui/material';
import { AccountsTable } from 'entities/account';
import { Filters } from 'widgets/filters';

const MainPage = () => {
	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxWidth="100%"
		>
			<Typography variant="H3">Accounts</Typography>
			<Filters />
			<Paper sx={{ flexGrow: 1 }}>
				<Stack
					// p={1}
					overflow="auto"
					maxWidth="100%"
					minHeight="100%"
				>
					<AccountsTable />
				</Stack>
			</Paper>
		</Stack>
	);
};

export default MainPage;
