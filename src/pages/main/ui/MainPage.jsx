import { Paper, Stack, Typography, useTheme } from '@mui/material';
import { Accounts } from 'entities/account';
import { Filters } from 'widgets/filters';

const MainPage = () => {
	const theme = useTheme();
	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxWidth="100%"
		>
			<Typography variant="H3">Accounts</Typography>
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
