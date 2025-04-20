import { Paper, Stack } from '@mui/material';
import { ImportFile } from 'widgets/import-account';
import useImportAccountsMutation from '../hooks/useImportAccountsMutation';
import ImportAccountsButton from './ImportAccountsButton';
import ImportAccountTable from './ImportAccountTable';

const ImportAccountForm = ({ onSuccess, onError }) => {
	const { mutate: importAccounts, isPending } = useImportAccountsMutation();

	return (
		<Paper
			sx={{ flexGrow: 1, overflow: 'auto' }}
			component={'form'}
			onSubmit={(e) => {
				e.preventDefault();
				importAccounts({
					onError,
					onSuccess,
				});
			}}
		>
			<Stack
				p={3}
				height="100%"
			>
				<ImportFile />
				<ImportAccountTable
					sx={{ marginTop: 2, flexGrow: 1, overflow: 'auto' }}
				/>
				<ImportAccountsButton buttonProps={{ loading: isPending }} />
			</Stack>
		</Paper>
	);
};

export default ImportAccountForm;
