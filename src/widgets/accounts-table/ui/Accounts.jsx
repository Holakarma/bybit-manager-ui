import { CircularProgress, Stack, Typography } from '@mui/material';
import { transferAccount, useGetAccountsQuery } from 'entities/account';
import { useFilter } from 'features/filter-accounts';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import AccountsTable from './AccountsTable';

const Accounts = () => {
	const groups = useFilter.use.groups();
	const { data: accounts, error, isLoading } = useGetAccountsQuery(groups);
	const { enqueueSnackbar } = useSnackbar();

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
		<AccountsTable
			initialRows={rows}
			onSuccess={() => {
				enqueueSnackbar('Row updated', {
					variant: 'success',
				});
			}}
			onError={(_e) => {
				enqueueSnackbar(`Some error occured`, {
					variant: 'error',
				});
			}}
		/>
	);
};

export default Accounts;
