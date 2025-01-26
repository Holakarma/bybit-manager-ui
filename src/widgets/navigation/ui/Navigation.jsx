import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router';
import { ExchangeIcon } from 'shared/assets/icons/exhange';
import ROUTES from 'shared/config/routes';

const Navigation = () => {
	const { pathname } = useLocation();
	const theme = useTheme();
	return (
		<Paper
			elevation={0}
			sx={{ height: '100%', minWidth: '250px' }}
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
					>
						<Link to={ROUTES.MAIN}>
							<Typography variant="H4B">Bybit Manager</Typography>
						</Link>
					</Box>
					<Link
						to={ROUTES.IMPORT}
						width="100%"
					>
						<Button
							variant="contained"
							disableElevation
							sx={{ width: '100%' }}
						>
							Import
						</Button>
					</Link>
				</Stack>
				<Stack>
					<Link to={ROUTES.MAIN}>
						<Button
							fullWidth
							variant={
								pathname === ROUTES.MAIN
									? 'contained'
									: 'outlined'
							}
							color="secondary"
							startIcon={<ExchangeIcon />}
							sx={{ justifyContent: 'start' }}
						>
							<Typography
								variant="body"
								color={
									pathname === ROUTES.MAIN
										? theme.palette.primary.main
										: ''
								}
							>
								All accounts
							</Typography>
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Paper>
	);
};

export default Navigation;
