import { CircularProgress, Stack, Typography } from '@mui/material';
import { transferAccount, useGetAccountsQuery } from 'entities/account';
import { useFilter } from 'features/filter-accounts';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import AccountsTable from './AccountsTable';

const Accounts = () => {
	const groups = useFilter.use.groups();
	const {
		data: accounts,
		error,
		isLoading,
		isError,
	} = useGetAccountsQuery(groups);
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

	if (isError) {
		return (
			<Stack
				justifyContent="center"
				alignItems="center"
				flexGrow={1}
			>
				<Typography variant="h3>">
					Error while receiving accounts.
					<br />
					{!error
						? 'Looks like you forgot to turn on the API server.'
						: error.code}
					<br />
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
