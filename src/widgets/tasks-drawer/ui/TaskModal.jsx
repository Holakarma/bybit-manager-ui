import { Box, Modal, Stack, Typography } from '@mui/material';
import { LoginTaskResult } from 'features/login';
import { LogoutTaskResult } from 'features/logout';
import { RefreshTaskResult } from 'features/refresh-balances';
import { RegisterTaskResult } from 'features/register';
import { UpdateProfileTaskResult } from 'features/update-profile';
import { timeDifference } from 'shared/lib/formatDate';
import { ModalBody } from 'shared/ui/modal-body';
import taskTitle from '../model/taskTitles';

const taskResult = (task) => {
	switch (task.type) {
		case 'login':
			return <LoginTaskResult task={task} />;
		case 'logout':
			return <LogoutTaskResult task={task} />;
		case 'finance accounts':
			return <RefreshTaskResult task={task} />;
		case 'register':
			return <RegisterTaskResult task={task} />;
		case 'update':
			return <UpdateProfileTaskResult task={task} />;
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
				<ModalBody minWidth="600px">
					<Stack
						direction="row"
						gap={2}
						alignItems="baseline"
						justifyContent="space-between"
					>
						<Typography variant="H5">
							{taskTitle[task.type]}
						</Typography>
						<Typography
							variant="Body"
							color="textSecondary"
						>
							{timeDifference(
								task.startedAt,
								task.timestamp,
								'mm:ss',
							)}
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
