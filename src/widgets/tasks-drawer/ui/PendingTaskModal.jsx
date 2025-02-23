import {
	Box,
	Grid2,
	List,
	ListItem,
	Modal,
	Stack,
	Typography,
} from '@mui/material';
import { getAccountsById, useGetAccountsQuery } from 'entities/account';
import { ModalBody } from 'shared/ui/modal-body';
import { Pulsing } from 'shared/ui/pulsing';
import taskTitle from '../model/taskTitles';

const PendingTaskModal = ({ task, open, handleClose }) => {
	const { data: accounts, isLoading, isError } = useGetAccountsQuery([]);

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
				<ModalBody minWidth="400px">
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
							overflow: 'auto',
						}}
					>
						{getAccountsById(accounts, task.data).map((account) => (
							<ListItem
								key={account.database_id}
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
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default PendingTaskModal;
