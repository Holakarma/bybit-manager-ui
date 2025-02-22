import {
	Box,
	Grid2,
	List,
	ListItem,
	Modal,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useGetAccountsQuery } from 'entities/account';
import { useMemo } from 'react';
import { ModalBody } from 'shared/ui/modal-body';
import { Pulsing } from 'shared/ui/pulsing';
import taskTitle from '../model/taskTitles';
import color from './../model/taskStatusColor';

const TaskModal = ({ task, open, handleClose }) => {
	const { data: accounts, isLoading, isError } = useGetAccountsQuery([]);

	const taskAccounts = useMemo(() => {
		if (!task) return [];

		return task.data.map((account) => ({
			status: account.status,
			error: account.error,
			account: { ...accounts.find((a) => a.database_id === account.id) },
		}));
	}, [accounts, task]);

	if (isLoading) {
		return (
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box>
					<ModalBody minWidth="400px">
						<Typography variant="H5">Loading...</Typography>
					</ModalBody>
				</Box>
			</Modal>
		);
	}

	if (isError || !task) {
		return (
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box>
					<ModalBody minWidth="400px">
						<Typography variant="H5">Some error occured</Typography>
					</ModalBody>
				</Box>
			</Modal>
		);
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
					<List
						sx={{
							marginBlock: 1,
							maxHeight: '300px',
							overflow: 'auto',
						}}
					>
						{taskAccounts.map((task) => (
							<ListItem
								key={task.id}
								disablePadding
							>
								<Grid2
									container
									spacing={2}
									width="100%"
								>
									<Grid2 size={1}>
										<Typography
											variant="Caption"
											color="textSecondary"
										>
											{task.account.database_id}
										</Typography>
									</Grid2>

									<Grid2 size="grow">
										<Stack
											direction="row"
											justifyContent="space-between"
											alignItems="center"
										>
											<Typography>
												{task.account.email.address}
											</Typography>
											<Tooltip
												title={
													task.status === 'success'
														? 'Cookies were updated'
														: task?.error
																?.bybit_response
																?.ret_msg ||
															'Some error occured'
												}
											>
												<Box component="span">
													<Pulsing
														animate={false}
														color={`${color[task.status]}.main`}
													/>
												</Box>
											</Tooltip>
										</Stack>
									</Grid2>
								</Grid2>
							</ListItem>
						))}
					</List>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default TaskModal;
