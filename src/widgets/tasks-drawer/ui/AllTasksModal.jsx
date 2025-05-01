import { Box, Modal, Stack, Typography } from '@mui/material';
import { ModalBody, ModalBodyBackground } from 'shared/ui/modal-body';
import LogsList from './LogsList';

const AllTasksModal = ({ open, handleClose }) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<ModalBody
				minWidth="800px"
				sx={{ p: 4 }}
			>
				<ModalBodyBackground>
					<Stack
						gap={1}
						height="100%"
						minWidth="100%"
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
									overflow: 'auto',
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
				</ModalBodyBackground>
			</ModalBody>
		</Modal>
	);
};

export default AllTasksModal;
