import {
	Alert,
	CircularProgress,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import { transferAccount, useGetAccountsQuery } from 'entities/account';
import { useFilter } from 'features/filter-accounts';
import { useMemo, useState } from 'react';
import AccountsTable from './AccountsTable';

const Accounts = () => {
	const groups = useFilter.use.groups();
	const { data: accounts, error, isLoading } = useGetAccountsQuery(groups);

	const [snackbar, setSnackbar] = useState({
		message: 'Some Error occured. Try again',
		severity: 'error',
	});

	const [open, setOpen] = useState(false);
	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const rows = useMemo(() => {
		if (accounts) {
			return accounts.map(transferAccount);
		}
		return null;
	}, [accounts]);

	if (isLoading) {
		return (
			<Stack
				justifyContent="center"
				alignItems="center"
				flexGrow={1}
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (error) {
		return (
			<Stack
				justifyContent="center"
				alignItems="center"
				flexGrow={1}
			>
				<Typography variant="h3>">
					Error while receiving accounts.
					<br />
					{error.code === 'ERR_NETWORK'
						? 'Looks like you forgot to turn on the API server.'
						: ''}
					<br />
					{error.code}
				</Typography>
			</Stack>
		);
	}

	return (
		<>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert
					severity={snackbar.severity}
					vaАriant="filled"
					sx={{ wisth: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
			<AccountsTable
				initialRows={rows}
				onSuccess={() => {
					setSnackbar({
						message: `Row updated!`,
						severity: 'success',
					});
					setOpen(true);
				}}
				onError={(e) => {
					setSnackbar({
						message: `Some error occured: ${e.message}`,
						severity: 'error',
					});
					setOpen(true);
				}}
			/>
		</>
	);
};

export default Accounts;
