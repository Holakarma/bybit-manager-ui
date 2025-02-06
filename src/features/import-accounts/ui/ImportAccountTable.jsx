import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import useAccounts from '../model/accountsToImportStore';
import AccountHeader from './AccountHeader';
import AccountRow from './AccountRow';

const ImportAccountTable = () => {
	const accounts = useAccounts.use.accounts();
	const editAccount = useAccounts.use.editAccount();

	// @TODO: add virtualization
	return (
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
	);
};

export default ImportAccountTable;
