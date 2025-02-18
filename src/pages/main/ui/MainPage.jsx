import { Paper, Stack, Typography, useTheme } from '@mui/material';
import { DefaultAccount } from 'entities/account';
import { Accounts } from 'widgets/accounts-table';
import { Filters } from 'widgets/filters';

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
				<DefaultAccount />
			</Stack>
			<Filters />
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
