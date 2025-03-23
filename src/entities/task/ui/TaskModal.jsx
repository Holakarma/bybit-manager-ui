import {
	Box,
	Button,
	Divider,
	Grid2,
	List,
	ListItem,
	Modal,
	Stack,
	Typography,
} from '@mui/material';
import { ModalBody } from 'shared/ui/modal-body';

const TaskModal = ({
	open,
	onClose,
	taskTitle,
	taskDescription,
	accounts,
	onStart,
	settingsComponent,
}) => {
	return (
		<Modal
			open={open}
			onClose={onClose}
		>
			<Box>
				<ModalBody
					sx={{ minWidth: '400px' }}
					position="relative"
				>
					<Stack
						direction="row"
						gap={2}
					>
						<Stack>
							<Typography variant="H5">{taskTitle}</Typography>

							<Typography
								variant="Body"
								color="textSecondary"
							>
								{taskDescription}
							</Typography>

							{settingsComponent || null}
							<Divider />

							<List
								sx={{
									marginBlock: 2,
									maxHeight: '300px',
									overflow: 'auto',
								}}
							>
								{(accounts || []).map((account) => (
									<ListItem
										key={account.database_id}
										disablePadding
									>
										<Grid2
											container
											spacing={1}
											width="100%"
										>
											<Grid2 size={1}>
												<Typography
													variant="Caption"
													color="textSecondary"
												>
													{account.database_id}
												</Typography>
											</Grid2>

											<Grid2 size="grow">
												<Typography>
													{account.email.address}
												</Typography>
											</Grid2>
										</Grid2>
									</ListItem>
								))}
							</List>

							<Button
								sx={{
									position: 'absolute',
									bottom: 12,
									right: 12,
								}}
								onClick={onStart}
							>
								Start task
							</Button>
						</Stack>
					</Stack>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default TaskModal;
