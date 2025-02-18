import { Grid2, Paper, Stack, Typography, useTheme } from '@mui/material';
import { DefaultAccount } from 'entities/account';
import { Login } from 'features/login';
import { Accounts } from 'widgets/accounts-table';
import { Filters } from 'widgets/filters';
import { TaskDrawer } from 'widgets/tasks-drawer';

const MainPage = () => {
	const theme = useTheme();
	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxWidth="100%"
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography variant="H3">Accounts</Typography>
				<Stack
					direction="row"
					alignItems="center"
					gap={1}
				>
					<DefaultAccount />
					<TaskDrawer />
				</Stack>
			</Stack>
			<Stack gap={2}>
				<Filters />
				<Grid2
					container
					columns={12}
				>
					<Grid2 size={2}>
						<Login />
					</Grid2>
				</Grid2>
			</Stack>
			<Paper
				sx={{
					flexGrow: 1,
					backgroundColor: theme.palette.secondary.dark,
					backgroundImage: 'none',
				}}
			>
				<Stack
					overflow="auto"
					maxWidth="100%"
					minHeight="100%"
				>
					<Accounts />
				</Stack>
			</Paper>
		</Stack>
	);
};

export default MainPage;
