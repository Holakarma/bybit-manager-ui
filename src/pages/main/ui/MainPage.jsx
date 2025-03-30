import {
	Grid2,
	Paper,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import { DefaultAccount } from 'entities/account';
import { Logout } from 'features/logout';
import { UpdateProfile } from 'features/update-profile';
import { DollarIcon } from 'shared/assets/icons/dollar';
import { RegisterIcon } from 'shared/assets/icons/register';
import { UsersIcon } from 'shared/assets/icons/users';
import { Accounts, useLayer } from 'widgets/accounts-table';
import { Filters } from 'widgets/filters';
import { MainAction } from 'widgets/main-action';
import { TaskDrawer } from 'widgets/tasks-drawer';

const getActions = (layer) => {
	switch (layer) {
		case 'general':
			return (
				<Stack
					direction="row"
					gap={2}
					sx={{ height: '100%' }}
				>
					<Logout />
					<UpdateProfile />
				</Stack>
			);
		default:
			return null;
	}
};

const MainPage = () => {
	const theme = useTheme();

	const layer = useLayer.use.layer();
	const setLayer = useLayer.use.setLayer();
	const handleLayer = (event, newLayer) => {
		if (newLayer !== null) {
			setLayer(newLayer);
		}
	};

	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxWidth="100%"
			// maxHeight="100%"
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
					spacing={2}
				>
					{/* Main Action */}
					<Grid2 size={'auto'}>
						<MainAction sx={{ paddingInline: 8 }} />
					</Grid2>

					{/* Tables toggler */}
					<Grid2 size={'auto'}>
						<ToggleButtonGroup
							value={layer}
							exclusive
							onChange={handleLayer}
							aria-label="text alignment"
						>
							<Tooltip
								enterDelay={500}
								title="General"
								arrow
							>
								<ToggleButton
									value="general"
									aria-label="left aligned"
								>
									<UsersIcon />
								</ToggleButton>
							</Tooltip>

							<Tooltip
								enterDelay={500}
								title="Balances"
								arrow
							>
								<ToggleButton
									value="balances"
									aria-label="centered"
								>
									<DollarIcon />
								</ToggleButton>
							</Tooltip>
							<Tooltip
								enterDelay={500}
								title="Register"
								arrow
							>
								<ToggleButton
									value="register"
									aria-label="centered"
								>
									<RegisterIcon />
								</ToggleButton>
							</Tooltip>
						</ToggleButtonGroup>
					</Grid2>

					{/* Actions */}
					<Grid2 size={'auto'}>
						<Stack
							justifyContent="center"
							height="100%"
							gap={2}
						>
							{getActions(layer)}
						</Stack>
					</Grid2>
				</Grid2>
			</Stack>
			<Paper
				sx={{
					flexGrow: 1,
					backgroundColor: theme.palette.secondary.dark,
					backgroundImage: 'none',
					// maxHeight: '100%',
					// overflow: 'auto',
				}}
			>
				<Stack
					overflow="auto"
					maxWidth="100%"
					height="100%"
				>
					<Accounts />
				</Stack>
			</Paper>
		</Stack>
	);
};

export default MainPage;
