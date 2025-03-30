import {
	Box,
	Button,
	Grid2,
	List,
	ListItem,
	Modal,
	Stack,
	Typography,
} from '@mui/material';
import { getAccountsById, useGetAccountsQuery } from 'entities/account';
import { useMemo } from 'react';
import { ModalBody } from 'shared/ui/modal-body';
import { Pulsing } from 'shared/ui/pulsing';
import taskTitle from '../model/taskTitles';

const PendingTaskModal = ({ task, open, handleClose }) => {
	const { data: accounts, isLoading, isError } = useGetAccountsQuery([]);

	const taskAccounts = useMemo(() => {
		if (!task || !accounts) return [];

		return getAccountsById(
			accounts,
			task.accounts.toProcess.map((acc) => acc.id),
		);
	}, [accounts, task]);

	const handleAbort = async () => {
		task.abort();
		handleClose();
	};

	if (!task) {
		return null;
	}

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
				<ModalBody minWidth="600px">
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
					<List
						sx={{
							marginBlock: 1,
							maxHeight: '300px',
							overflowY: 'auto',
						}}
					>
						{taskAccounts.map((account) => {
							const processed = task.accounts.processed.find(
								(acc) => acc.id === account.database_id,
							);
							const description = processed
								? 'complete'
								: task.accounts.toProcess.find(
										(acc) => acc.id === account.database_id,
									).description;

							return (
								<ListItem
									key={account.database_id}
									disablePadding
								>
									<Grid2
										container
										spacing={2}
										width="100%"
									>
										<Grid2 size="auto">
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

										<Grid2 size={'auto'}>
											<Stack
												alignItems="center"
												justifyContent="center"
												height="100%"
											>
												{processed ? (
													<Pulsing
														animate={false}
														color={
															processed.error
																? 'error.main'
																: 'success.main'
														}
													/>
												) : (
													<Stack
														direction="row"
														gap={2}
														alignItems="center"
													>
														<Typography
															variant="caption"
															color="textSecondary"
														>
															{description}
														</Typography>
														<Pulsing />
													</Stack>
												)}
											</Stack>
										</Grid2>
									</Grid2>
								</ListItem>
							);
						})}
					</List>

					<Box
						mt={2}
						textAlign="end"
					>
						<Button onClick={handleAbort}>Abort task</Button>
					</Box>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default PendingTaskModal;
