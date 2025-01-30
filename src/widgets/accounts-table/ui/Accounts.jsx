import { CircularProgress, Stack, Typography } from '@mui/material';
import { transferAccount, useGetAccountsQuery } from 'entities/account';
import { useMemo } from 'react';
import AccountsTable from './AccountsTable';

const Accounts = () => {
	// const group = useFilter.use.group();
	// const { data: accounts, error, isLoading } = useGetAccountsQuery(group);
	const { data: accounts, error, isLoading } = useGetAccountsQuery();

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

	return <AccountsTable initialRows={rows} />;
};

export default Accounts;
