import { Box } from '@mui/material';
import { forwardRef } from 'react';

const style = {
	position: 'absolute',
	top: 0,
	bottom: 0,
	maxWidth: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	padding: 3,
};

// eslint-disable-next-line react/display-name
const ModalBody = forwardRef(({ children, sx, ...props }, ref) => {
	return (
		<Box
			ref={ref}
			sx={{ ...style, ...sx }}
			{...props}
		>
			{children}
		</Box>
	);
});

export default ModalBody;
