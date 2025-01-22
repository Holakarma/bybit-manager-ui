import { CircularProgress, Stack } from '@mui/material';

const FallbackComponent = () => {
	return (
		<Stack
			width="100%"
			height="100%"
			alignItems="center"
			justifyContent="center"
		>
			<CircularProgress color="primary" />
		</Stack>
	);
};

export default FallbackComponent;
