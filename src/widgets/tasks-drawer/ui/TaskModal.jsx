import { Box, Modal, Stack, Typography } from '@mui/material';
import { LoginTaskResult } from 'features/login';
import { ModalBody } from 'shared/ui/modal-body';
import taskTitle from '../model/taskTitles';

const taskResult = (task) => {
	switch (task.type) {
		case 'login':
			return <LoginTaskResult task={task} />;
		default:
			return null;
	}
};

const TaskModal = ({ task, open, handleClose }) => {
	if (!task) {
		return null;
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<Box>
				<ModalBody minWidth="400px">
					<Stack
						direction="row"
						gap={2}
						alignItems="center"
					>
						<Typography variant="H5">
							{taskTitle[task.type]}
						</Typography>
					</Stack>
					<Box
						sx={{
							marginBlock: 1,
							maxHeight: '300px',
							overflow: 'auto',
						}}
					>
						{taskResult(task)}
					</Box>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default TaskModal;
