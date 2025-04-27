import { Box, Modal, Stack, Typography } from '@mui/material';
import { taskTitle } from 'entities/task';
import { CustomRequestTaskResult } from 'features/custom-request';
import { Disable2faTaskResult } from 'features/disable-2fa';
import { Enable2faTaskResult } from 'features/enable-2fa';
import { LoginTaskResult } from 'features/login';
import { LogoutTaskResult } from 'features/logout';
import { RefreshTaskResult } from 'features/refresh-balances';
import { RegisterTaskResult } from 'features/register';
import { SetPreferencesTaskResult } from 'features/set-preference';
import { UpdateProfileTaskResult } from 'features/update-profile';
import { WhiteListTaskResult } from 'features/whitelist';
import { timeDifference } from 'shared/lib/formatDate';
import { ModalBody, ModalBodyBackground } from 'shared/ui/modal-body';

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
		case 'set_preferences':
			return <SetPreferencesTaskResult task={task} />;
		case 'disable2fa':
			return <Disable2faTaskResult task={task} />;
		case 'enable2fa':
			return <Enable2faTaskResult task={task} />;
		case 'custom request':
			return <CustomRequestTaskResult task={task} />;
		case 'withdraw-whitelist':
			return <WhiteListTaskResult task={task} />;
		default:
			return 'no task result component';
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
			<ModalBody
				minWidth="600px"
				sx={{ p: 4 }}
			>
				<ModalBodyBackground>
					<Stack
						gap={1}
						height="100%"
					>
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
								flexGrow: 1,
								position: 'relative',
							}}
						>
							<Box
								sx={{
									height: '100%',
									overflow: 'auto',
									position: 'absolute',
									top: 0,
									bottom: 0,
									left: 0,
									right: 0,
								}}
							>
								{taskResult(task)}
							</Box>
						</Box>
					</Stack>{' '}
				</ModalBodyBackground>
			</ModalBody>
		</Modal>
	);
};

export default TaskModal;
