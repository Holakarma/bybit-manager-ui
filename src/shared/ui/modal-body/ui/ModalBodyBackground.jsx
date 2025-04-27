import { Box, Stack } from '@mui/material';

const style = {
	bgcolor: 'background.paper',
	boxShadow: 24,
	height: '100%',
	minWidth: '600px',
	p: 3,
};

const ModalBodyBackground = ({ sx, children, ...props }) => {
	return (
		<Stack
			height="100%"
			maxWidth="100%"
			overflow="auto"
			justifyContent="center"
			alignItems="center"
		>
			<Box
				{...props}
				sx={{ ...style, ...sx }}
			>
				{children}
			</Box>
		</Stack>
	);
};

export default ModalBodyBackground;
