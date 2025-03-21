import { CircularProgress, Stack, Typography } from '@mui/material';
import {
	transferAccountGeneral,
	transferFinanceAccounts,
	useGetAccountsQuery,
} from 'entities/account';
import {
	createFinanceAccountsConfig,
	useGetFinanceAccountsDB,
} from 'entities/finance-account';
import { useFilter } from 'features/filter-accounts';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import useLayer from '../model/layerStore';
import AccountsTable from './AccountsTable';

const Accounts = () => {
	const groups = useFilter.use.groups();
	const layer = useLayer.use.layer();
	const { enqueueSnackbar } = useSnackbar();

	const {
		data: accounts,
		error,
		isLoading,
		isError,
	} = useGetAccountsQuery(groups);

	const { data: financeAccounts, isLoading: isFinanceAccountsLoading } =
		useGetFinanceAccountsDB(accounts?.map((account) => account.uid));

	const rows = useMemo(() => {
		if (accounts && financeAccounts) {
			switch (layer) {
				case 'general':
					return accounts.map(transferAccountGeneral);
				case 'balances':
					return accounts.map((account) =>
						transferFinanceAccounts(
							account,
							financeAccounts[account.uid],
						),
					);
			}
		}
		return null;
	}, [accounts, layer, financeAccounts]);

	const additionalColumns = useMemo(() => {
		if (layer === 'balances' && rows) {
			return createFinanceAccountsConfig(rows);
		}
		return [];
	}, [layer, rows]);

	if (isLoading || isFinanceAccountsLoading) {
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
			additionalColumns={additionalColumns}
			layer={layer}
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
