import { CircularProgress, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import useGetAccountsQuery from '../hooks/useGetAccountsQuery';
import getMarksArray from '../lib/getMarksArray';
import AccountsTable from './AccountsTable';

const Accounts = () => {
	const { data: accounts, error, isLoading } = useGetAccountsQuery();

	console.log(error); // error.code = 'ERR_NETWORK', error.config.data = undefined

	const rows = useMemo(() => {
		if (accounts) {
			return accounts.map((account) => ({
				id: account.database_id,
				name: account.name,
				group: account.group_name,
				email: account.email.address,
				imap: account.email.imap_address,
				balance: account.trading_balance + ' ' + account.web3_balance,
				kyc: account.kyc_level + ' ' + account.country,
				loginCountry:
					account.last_login_country_code +
					' ' +
					account.last_login_ip,
				marks: getMarksArray(account),
				session: '21.01.2025 15:52 (59h09m)',
				warnings: 'a a',
			}));
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
