import { Stack, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import useAccounts from '../model/accountsToImportStore';
import AccountHeader from './AccountHeader';
import AccountRow from './AccountRow';

const ImportAccountTable = ({ ...props }) => {
	const accounts = useAccounts.use.accounts();
	const editAccount = useAccounts.use.editAccount();
	const theme = useTheme();

	return (
		<Stack
			justifyContent="space-between"
			alignItems="end"
			overflow="auto"
			{...props}
		>
			<TableContainer
				sx={{
					flexGrow: 1,
					paddingBlock: 1,
					scrollbarWidth: 'thin',
					scrollbarColor: `${theme.palette.textSecondary.default} transparent`,
				}}
			>
				<Table sx={{ minWidth: 2200 }}>
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
	);
};

export default ImportAccountTable;
