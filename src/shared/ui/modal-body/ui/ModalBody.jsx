import { Box } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

const ModalBody = ({ children, sx, ...props }) => {
	return (
		<Box
			sx={{ ...style, ...sx }}
			{...props}
		>
			{children}
		</Box>
	);
};

export default ModalBody;
