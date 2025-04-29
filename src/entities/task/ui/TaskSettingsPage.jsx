import { Box } from '@mui/material';

const TaskSettingsPage = ({ children }) => {
	return (
		<Box
			paddingInline={2}
			height="100%"
		>
			{children}
		</Box>
	);
};

export default TaskSettingsPage;
