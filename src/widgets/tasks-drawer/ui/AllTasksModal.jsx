import { Box, Modal, Stack, Typography } from '@mui/material';
import { ModalBody } from 'shared/ui/modal-body';
import LogsList from './LogsList';

const AllTasksModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<Box>
				<ModalBody minWidth="600px">
					<Stack
						gap={1}
						height="100%"
					>
						<Stack
							direction="row"
							gap={2}
							alignItems="center"
						>
							<Typography variant="H5">Logs</Typography>
						</Stack>

						<Box
							sx={{
								flexGrow: 1,
								position: 'relative',
							}}
						>
							<Box
								sx={{
									overflowY: 'auto',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									position: 'absolute',
								}}
							>
								<LogsList />
							</Box>
						</Box>
					</Stack>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default AllTasksModal;
