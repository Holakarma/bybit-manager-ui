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
	startButtonProps,
	startTitle,
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
						height="100%"
					>
						<Stack
							width="100%"
							flexGrow={1}
						>
							<Typography variant="H5">{taskTitle}</Typography>

							<Typography
								variant="Body"
								color="textSecondary"
							>
								{taskDescription}
							</Typography>

							{settingsComponent || null}

							<Divider sx={{ marginTop: 2 }} />

							<Box
								flexGrow={1}
								position="relative"
								marginBottom={2}
							>
								<List
									sx={{
										position: 'absolute',
										top: 0,
										left: 0,
										bottom: 0,
										right: 0,
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
													<Stack
														direction="row"
														justifyContent="space-between"
													>
														<Typography>
															{
																account.email
																	.address
															}
														</Typography>
														<Typography>
															{account.group_name}
														</Typography>
													</Stack>
												</Grid2>
											</Grid2>
										</ListItem>
									))}
								</List>
							</Box>

							<Button
								{...startButtonProps}
								sx={{
									position: 'absolute',
									bottom: 12,
									right: 12,
								}}
								onClick={onStart}
							>
								{startTitle || 'Start task'}
							</Button>
						</Stack>
					</Stack>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default TaskModal;
