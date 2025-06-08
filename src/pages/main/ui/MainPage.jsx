import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import KeyOffRoundedIcon from '@mui/icons-material/KeyOffRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import PersonSearchRoundedIcon from '@mui/icons-material/PersonSearchRounded';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import SmartButtonRoundedIcon from '@mui/icons-material/SmartButtonRounded';
import {
	Button,
	Divider,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from '@mui/material';
import { DefaultAccount, SelectedAccounts } from 'entities/account';
import { CustomRequest } from 'features/custom-request';
import { DepositCoinsChains } from 'features/depositCoinsChains';
import { Disable2fa } from 'features/disable-2fa';
import { Enable2fa } from 'features/enable-2fa';
import { ExportAccounts } from 'features/export-accounts';
import { Login } from 'features/login';
import { Logout } from 'features/logout';
import { Refresh } from 'features/refresh-balances';
import { RefreshDepositAddress } from 'features/refresh-deposit';
import { Register } from 'features/register';
import { SetPreferences } from 'features/set-preference';
import { Transfer } from 'features/transfer';
import { UpdateProfile } from 'features/update-profile';
import { Whitelist } from 'features/whitelist';
import { cloneElement, useState } from 'react';
import { DepositIcon } from 'shared/assets/icons/deposit';
import { DollarIcon } from 'shared/assets/icons/dollar';
import { RegisterIcon } from 'shared/assets/icons/register';
import { ShieldLockIcon } from 'shared/assets/icons/shield-lock';
import { UsersIcon } from 'shared/assets/icons/users';
import { Accounts, useLayer } from 'widgets/accounts-table';
import { Filters } from 'widgets/filters';
import { TaskDrawer } from 'widgets/tasks-drawer';

const otherActions = [
	{
		component: <ExportAccounts />,
		title: 'Export accounts',
		icon: <FileUploadRoundedIcon />,
	},
	{
		component: <CustomRequest />,
		title: 'Custom request',
		icon: <SmartButtonRoundedIcon />,
	},
];

const getActions = (layer) => {
	switch (layer) {
		case 'general':
			return [
				{
					component: <Login />,
					title: 'Login',
					icon: <LoginRoundedIcon />,
				},

				{
					component: <Logout />,
					title: 'Logout',
					icon: <LogoutRoundedIcon />,
				},
				{
					component: <UpdateProfile />,
					title: 'Update profile',
					icon: <PersonSearchRoundedIcon />,
				},

				{
					component: <Whitelist />,
					title: 'Whitelist',
					icon: <QueueRoundedIcon />,
				},
				{
					component: <SetPreferences />,
					title: 'Set preferences',
					icon: <ManageAccountsRoundedIcon />,
				},
			];
		case '2fa':
			return [
				{
					component: <Enable2fa />,
					title: 'Enable 2fa',
					icon: <KeyRoundedIcon />,
				},
				{
					component: <Disable2fa />,
					title: 'Disable 2fa',
					icon: <KeyOffRoundedIcon />,
				},
			];
		case 'balances':
			return [
				{
					component: <Refresh />,
					title: 'Refresh',
					icon: <RefreshRoundedIcon />,
				},
				{
					component: <Transfer />,
					title: 'Transfer',
					icon: <MoveDownRoundedIcon />,
				},
			];
		case 'register':
			return [
				{
					component: <Register />,
					title: 'Register',
					icon: <HowToRegRoundedIcon />,
				},
			];
		case 'deposit':
			return [
				{
					component: <RefreshDepositAddress />,
					title: 'Refresh',
					icon: <RefreshRoundedIcon />,
				},
			];
		default:
			return [];
	}
};

const getMenuItems = (actions, props) => [
	actions.map((action, i) =>
		cloneElement(action.component, {
			children: (
				<MenuItem disableRipple>
					<ListItemIcon>{action.icon}</ListItemIcon>
					<ListItemText>{action.title}</ListItemText>
				</MenuItem>
			),
			key: i,
			...props,
		}),
	),
	<Divider key="divider" />,
	otherActions.map((action, i) =>
		cloneElement(action.component, {
			children: (
				<MenuItem disableRipple>
					<ListItemIcon>{action.icon}</ListItemIcon>
					<ListItemText>{action.title}</ListItemText>
				</MenuItem>
			),
			key: i,
			...props,
		}),
	),
];

const layers = [
	{ value: 'general', icon: <UsersIcon /> },
	{ value: 'balances', icon: <DollarIcon /> },
	{ value: 'register', icon: <RegisterIcon /> },
	{ value: '2fa', icon: <ShieldLockIcon /> },
	{ value: 'deposit', icon: <DepositIcon /> },
];

const getAdditionalActions = (layer) => {
	switch (layer) {
		case 'deposit':
			return [<DepositCoinsChains key="depositCoinPicker" />];
		default:
			return [];
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

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
				<Stack
					direction="row"
					alignItems="center"
					gap={2}
				>
					{/* layer toggler */}
					<ToggleButtonGroup
						value={layer}
						exclusive
						onChange={handleLayer}
						aria-label="text alignment"
					>
						{layers.map(({ value, icon }) => (
							<ToggleButton
								key={value}
								value={value}
								aria-label="left aligned"
								sx={{
									display: 'flex',
									gap: 1,
									alignItems: 'center',
								}}
							>
								{icon}
								{value}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
					{/* Actions */}
					<Button
						id="basic-button"
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						variant="outlined"
						color="secondary"
						startIcon={<FormatListBulletedRoundedIcon />}
						focusRipple={false}
						sx={{ height: '100%' }}
					>
						Actions
					</Button>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						slotProps={{ paper: { sx: { minWidth: '250px' } } }}
					>
						{getMenuItems(getActions(layer), {
							onClose: handleClose,
						})}
					</Menu>

					{/* Additional */}
					{getAdditionalActions(layer)}
				</Stack>
			</Stack>

			{/* Table */}
			<Paper
				sx={{
					flexGrow: 1,
					backgroundColor: theme.palette.secondary.dark,
					backgroundImage: 'none',
				}}
			>
				<Accounts />
			</Paper>
		</Stack>
	);
};

export default MainPage;
