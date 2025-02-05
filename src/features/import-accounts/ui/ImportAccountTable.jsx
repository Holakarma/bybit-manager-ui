import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import useAccounts from '../model/accountsToImportStore';
import AccountHeader from './AccountHeader';
import AccountRow from './AccountRow';
import EmptyAccountRow from './EmptyAccountRow';

const ImportAccountTable = () => {
	const accounts = useAccounts.use.accounts();

	console.log(accounts);
	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }}>
				<AccountHeader />
				<TableBody>
					{accounts.map((account, i) => (
						<AccountRow
							key={i}
							account={account}
							sx={{
								'& td, & th': {
									border: 0,
								},
							}}
						/>
					))}
					<EmptyAccountRow
						sx={{
							'& td, & th': {
								border: 0,
							},
						}}
					/>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ImportAccountTable;
