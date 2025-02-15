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
				width: collapse ? '96px' : '250px',
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
					<Button
						to={ROUTES.IMPORT}
						component={Link}
						variant="contained"
						disableElevation
						sx={{ width: '100%' }}
					>
						{collapse ? <ImportIcon /> : 'Import'}
					</Button>
				</Stack>
				<Stack>
					<Button
						component={Link}
						to={ROUTES.MAIN}
						fullWidth
						variant={
							pathname === ROUTES.MAIN ? 'contained' : 'outlined'
						}
						color="secondary"
						startIcon={collapse ? undefined : <ExchangeIcon />}
						sx={{
							justifyContent: collapse ? 'center' : 'start',
						}}
					>
						{collapse ? (
							<ExchangeIcon />
						) : (
							<Typography
								variant="body"
								color={
									pathname === ROUTES.MAIN
										? theme.palette.primary.main
										: ''
								}
							>
								Accounts
							</Typography>
						)}
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default Navigation;
