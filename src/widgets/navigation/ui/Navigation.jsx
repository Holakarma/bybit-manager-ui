import {
	Box,
	Button,
	IconButton,
	Paper,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router';
import { ChecvronIcon } from 'shared/assets/icons/chevron';
import { ExchangeIcon } from 'shared/assets/icons/exhange';
import { ImportIcon } from 'shared/assets/icons/import';
import ROUTES from 'shared/config/routes';
import useAside from '../model/asideStore';

const MENU = {
	[ROUTES.IMPORT]: {
		icon: <ImportIcon />,
		label: 'Import',
	},
	[ROUTES.MAIN]: {
		icon: <ExchangeIcon />,
		label: 'Accounts',
	},
};

const Navigation = () => {
	const { pathname } = useLocation();
	const theme = useTheme();

	const toggleCollapse = useAside.use.toggleCollapse();
	const collapse = useAside.use.collapse();

	return (
		<Paper
			elevation={0}
			sx={{
				height: '100%',
				width: collapse ? '96px' : '270px',
				transition: 'all .2s ease',
			}}
		>
			<Stack
				gap={2}
				alignItems="stretch"
				paddingInline={2}
			>
				<Stack gap={1}>
					<Box
						textAlign="center"
						paddingBlock={4}
						paddingInline={1}
						position="relative"
					>
						<IconButton
							sx={(theme) => ({
								paddingInline: '0',
								borderRadius: '4px',
								position: 'absolute',
								top: '50%',
								right: 0,
								transform: 'translate(100%, -50%);',
								background: theme.palette.background.paper,
								boxShadow: '0px 0px 2px 2px #111111BC',
							})}
							onClick={toggleCollapse}
						>
							<ChecvronIcon
								fill={theme.palette.textPrimary.default}
								transform={
									collapse ? 'scale(1, 1)' : 'scale(-1, 1)'
								}
								style={{ transition: 'all .2s ease' }}
							/>
						</IconButton>

						<Link to={ROUTES.MAIN}>
							<Typography variant="H4B">
								{collapse ? 'BM' : 'Bybit Manager'}
							</Typography>
						</Link>
					</Box>
				</Stack>
				<Stack gap={1}>
					{Object.entries(MENU).map(([route, { icon, label }]) => (
						<Button
							key={route}
							to={route}
							component={Link}
							fullWidth
							disableElevation
							color="secondary"
							sx={{
								justifyContent: collapse ? 'center' : 'start',
							}}
							variant={
								pathname === route ? 'contained' : 'outlined'
							}
							startIcon={collapse ? undefined : icon}
						>
							{collapse ? (
								icon
							) : (
								<Typography
									variant="body"
									color={
										pathname === route
											? theme.palette.primary.main
											: ''
									}
								>
									{label}
								</Typography>
							)}
						</Button>
					))}
				</Stack>
			</Stack>
		</Paper>
	);
};

export default Navigation;
