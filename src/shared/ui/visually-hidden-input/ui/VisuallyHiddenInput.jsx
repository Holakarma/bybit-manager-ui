import { Input } from '@mui/material';

const VisuallyHiddenInput = ({ ...props }) => {
	return (
		<Input
			{...props}
			sx={{
				clip: 'rect(0 0 0 0)',
				clipPath: 'inset(50%)',
				height: 1,
				overflow: 'hidden',
				position: 'absolute',
				bottom: 0,
				left: 0,
				whiteSpace: 'nowrap',
				width: 1,
			}}
		/>
	);
};

export default VisuallyHiddenInput;
