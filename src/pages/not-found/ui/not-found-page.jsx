import { Box, Typography } from '@mui/material';
import { Link } from 'react-router';
import ROUTES from 'shared/config/routes';

const NotFound = () => {
	return (
		<Box>
			<Typography variant="h1">404. Page was not found</Typography>
			Go to <Link to={ROUTES.MAIN}>main page</Link>.
		</Box>
	);
};

export default NotFound;
