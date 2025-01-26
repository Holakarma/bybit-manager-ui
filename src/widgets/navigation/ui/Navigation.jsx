import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';
import ROUTES from 'shared/config/routes';

const Navigation = () => {
	return (
		<Paper
			elevation={0}
			sx={{ height: '100%', minWidth: '250px' }}
		>
			<Stack
				gap={2}
				alignItems="stretch"
			>
				<Stack
					gap={1}
					paddingInline={2}
				>
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
			</Stack>
		</Paper>
	);
};

export default Navigation;
