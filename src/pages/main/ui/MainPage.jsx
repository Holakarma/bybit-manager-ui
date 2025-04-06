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
import { DefaultAccount, SelectedAccounts } from 'entities/account';
import { CustomRequest } from 'features/custom-request';
import { Disable2fa } from 'features/disable-2fa';
import { Enable2fa } from 'features/enable-2fa';
import { ExportAccounts } from 'features/export-accounts';
import { Login } from 'features/login';
import { Logout } from 'features/logout';
import { Refresh } from 'features/refresh-balances';
import { Register } from 'features/register';
import { UpdateProfile } from 'features/update-profile';
import { DollarIcon } from 'shared/assets/icons/dollar';
import { RegisterIcon } from 'shared/assets/icons/register';
import { ShieldLockIcon } from 'shared/assets/icons/shield-lock';
import { UsersIcon } from 'shared/assets/icons/users';
import { Accounts, useLayer } from 'widgets/accounts-table';
import { Filters } from 'widgets/filters';
import { TaskDrawer } from 'widgets/tasks-drawer';

const getActions = (layer) => {
	switch (layer) {
		case 'general':
			return [
				<ExportAccounts key="export" />,
				<Logout key="logout" />,
				<UpdateProfile key="update" />,
				<CustomRequest key="custom-request" />,
			];
		case '2fa':
			return [
				<ExportAccounts key="export" />,
				<Enable2fa key="enable2fa" />,
				<Disable2fa key="disable2fa" />,
			];
		default:
			return [<ExportAccounts key="export" />];
	}
};

const getMainAction = (layer, props) => {
	switch (layer) {
		case 'balances':
			return <Refresh {...props} />;
		case 'register':
			return <Register {...props} />;
		case 'genereal':
		default:
			return <Login {...props} />;
	}
};

const MainPage = () => {
	const theme = useTheme();

	const layer = useLayer.use.layer();
	const setLayer = useLayer.use.setLayer();
	const handleLayer = (_event, newLayer) => {
		if (newLayer !== null) {
			setLayer(newLayer);
		}
	};

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
					gap={2}
				>
					<SelectedAccounts />
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
					<Grid2 size={2}>
						{getMainAction(layer, {
							sx: { paddingInline: 8, height: '100%' },
						})}
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

							<Tooltip
								enterDelay={500}
								title="2FA"
								arrow
							>
								<ToggleButton
									value="2fa"
									aria-label="centered"
								>
									<ShieldLockIcon />
								</ToggleButton>
							</Tooltip>
						</ToggleButtonGroup>
					</Grid2>

					{/* Actions */}
					<Grid2 size={'auto'}>
						<Stack
							justifyContent="center"
							height="100%"
							gap={1}
							direction={'row'}
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
