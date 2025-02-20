import {
	Box,
	Button,
	Grid2,
	List,
	ListItem,
	Modal,
	Typography,
} from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { useState } from 'react';
import { ModalBody } from 'shared/ui/modal-body';
import useLoginTask from '../api/loginAccount';
import LoginSettings from './LoginSettings';

const Login = ({ ...props }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	const mutation = useLoginTask();

	const [settings, setSettings] = useState({
		order: 'parallel',
		delay: 500,
		shuffle: false,
	});

	return (
		<>
			<Button
				{...props}
				variant="contained"
				fullWidth
				disabled={isLoading || isError || !selectedAccounts.length}
				loading={isLoading}
				onClick={handleOpen}
			>
				Login
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box>
					<ModalBody position="relative">
						<LoginSettings
							settings={settings}
							onSettingsChange={(newSettings) =>
								setSettings(newSettings)
							}
						/>

						<Typography variant="H5">Create login task</Typography>
						<Typography
							variant="Title1"
							color="textSecondary"
						>
							Are you sure you want to login for following
							accounts?
						</Typography>

						<List
							sx={{
								marginBlock: 2,
								maxHeight: '300px',
								overflow: 'auto',
							}}
						>
							{(selectedAccounts || []).map((account) => (
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
							sx={{ position: 'absolute', bottom: 12, right: 12 }}
							onClick={() => {
								mutation.mutate(
									selectedAccounts.map(
										(account) => account.database_id,
									),
								);
							}}
						>
							Start task
						</Button>
					</ModalBody>
				</Box>
			</Modal>
		</>
	);
};

export default Login;
