import { Stack } from '@mui/material';

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
			minWidth="100%"
			overflow="auto"
			justifyContent="start"
			{...props}
			sx={{ ...style, ...sx }}
		>
			{children}
		</Stack>
	);
};

export default ModalBodyBackground;
