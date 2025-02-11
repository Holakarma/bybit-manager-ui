import { Stack } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { SnackbarProvider } from 'notistack';
import useAccounts from '../model/accountsToImportStore';
import AccountHeader from './AccountHeader';
import AccountRow from './AccountRow';

const ImportAccountTable = ({ ...props }) => {
	const accounts = useAccounts.use.accounts();
	const editAccount = useAccounts.use.editAccount();

	return (
		<SnackbarProvider maxSnack={5}>
			<Stack
				justifyContent="space-between"
				alignItems="end"
				{...props}
			>
				<TableContainer>
					<Table sx={{ minWidth: 650 }}>
						<AccountHeader />
						<TableBody>
							{accounts.map((account, i) => (
								<AccountRow
									key={account.id}
									account={account}
									onEdit={(updatedAccount) =>
										editAccount(i, updatedAccount)
									}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Stack>
		</SnackbarProvider>
	);
};

export default ImportAccountTable;
