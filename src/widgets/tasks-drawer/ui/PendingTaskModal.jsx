import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { groupedLogs, useLogs } from 'entities/log';
import { taskTitle } from 'entities/task';
import { useMemo } from 'react';
import { ModalBody, ModalBodyBackground } from 'shared/ui/modal-body';
import { Pulsing } from 'shared/ui/pulsing';
import PendingTaskAccountItem from './PendingTaskAccountItem';

const PendingTaskModal = ({ task, open, handleClose }) => {
	const logs = useLogs.use.logs();

	const grouped = useMemo(() => {
		if (task) {
			return groupedLogs(logs[task.id] || []);
		}
	}, [task, logs]);

	if (!task) {
		return null;
	}

	const handleAbort = async () => {
		task.abort();
		handleClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<Box>
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
								alignItems="center"
							>
								<Typography variant="H5">
									{taskTitle[task.type]}
								</Typography>
								<Pulsing />
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
									{task.data.map((database_id) => (
										<PendingTaskAccountItem
											key={database_id}
											database_id={database_id}
											logs={grouped[database_id]}
										/>
									))}
								</Box>
							</Box>

							<Box textAlign="end">
								<Button onClick={handleAbort}>
									Abort task
								</Button>
							</Box>
						</Stack>{' '}
					</ModalBodyBackground>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default PendingTaskModal;
