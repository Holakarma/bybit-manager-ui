import { Button, Modal, Stack, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { ImportAccountForm, useAccounts } from 'features/import-accounts';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { ERRORS } from 'shared/api';
import { ModalBody } from 'shared/ui/modal-body';

const ImportPage = () => {
	const deleteAccount = useAccounts.use.deleteAccount();
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [account, setAccount] = useState(null);
	const [error, setError] = useState(null);
	const queryClient = useQueryClient();

	const handleError = (account, error) => {
		console.log(error);
		enqueueSnackbar(`Import ${account.bybit_email} failed`, {
			variant: 'error',

			action: () => (
				<Button
					onClick={() => {
						handleOpen();
						setAccount(account);
						setError(error);
					}}
					color="inherit"
					size="small"
				>
					DETAILS
				</Button>
			),
		});
	};

	const handleSuccess = (account, result) => {
		enqueueSnackbar(`${result.email.address} successfully imported`, {
			variant: 'success',
		});
		deleteAccount(account.id);
		queryClient.invalidateQueries({ key: ['accounts'] });
	};

	return (
		<Stack
			gap={4}
			flexGrow={1}
			maxHeight="100%"
		>
			<Typography variant="H3">Import accounts</Typography>
			<ImportAccountForm
				onError={handleError}
				onSuccess={handleSuccess}
			/>

			<Modal
				open={open}
				onClose={handleClose}
			>
				<ModalBody>
					<Typography variant="H6">
						Error while import account {account?.bybit_email || ''}
					</Typography>
					<Typography sx={{ mt: 2 }}>
						{!error
							? 'Cannot reach the server. It looks like you forgot to turn on the API server.'
							: ERRORS[error.error] || error.detail}
					</Typography>
				</ModalBody>
			</Modal>
		</Stack>
	);
};

export default ImportPage;
