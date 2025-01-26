import { Button } from '@mui/material';

const ActionButton = ({ children }) => {
	return (
		<Button
			variant="contained"
			color="secondary"
		>
			{children}
		</Button>
	);
};

export default ActionButton;
