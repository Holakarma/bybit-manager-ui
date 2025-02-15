import { Paper, Stack } from '@mui/material';
import { ImportAccount } from 'widgets/import-account';
import useImportAccountsMutation from '../hooks/useImportAccountsMutation';
import ImportAccountTable from './ImportAccountTable';
import ImportAccountsButton from './ImportAccountsButton';

const ImportAccountForm = ({ onSuccess, onError }) => {
	const { mutate: importAccounts, isPending } = useImportAccountsMutation();
	return (
		<Paper
			sx={{ flexGrow: 1, overflow: 'auto' }}
			component={'form'}
			onSubmit={(e) => {
				e.preventDefault();
				importAccounts({
					form: new FormData(e.target),
					onError,
					onSuccess,
				});
			}}
		>
			<Stack
				p={3}
				height="100%"
			>
				<ImportAccount />
				<ImportAccountTable
					sx={{ marginTop: 2, flexGrow: 1, overflow: 'auto' }}
				/>
				<ImportAccountsButton buttonProps={{ loading: isPending }} />
			</Stack>
		</Paper>
	);
};

export default ImportAccountForm;
