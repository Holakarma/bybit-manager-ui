import { Paper, Stack, Typography } from '@mui/material';
import {
	ImportAccountsButton,
	ImportAccountTable,
	useImportAccountsMutation,
} from 'features/import-accounts';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ImportAccount } from 'widgets/import-account';

const ImportPage = () => {
	const { mutate: importAccounts } = useImportAccountsMutation();
	const { enqueueSnackbar } = useSnackbar();

	return (
		<SnackbarProvider maxSnack={3}>
			<Stack
				gap={4}
				flexGrow={1}
				maxHeight="100%"
			>
				<Typography variant="H3">Import accounts</Typography>
				<Paper
					sx={{ flexGrow: 1, overflow: 'auto' }}
					component={'form'}
					onSubmit={(e) => {
						e.preventDefault();
						importAccounts({
							form: new FormData(e.target),
							onError: (account) => {
								console.log(account);
								enqueueSnackbar(
									`${account.bybit_email} Failed`,
									{
										variant: 'error',
									},
								);
							},
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
						<ImportAccountsButton />
					</Stack>
				</Paper>
			</Stack>
		</SnackbarProvider>
	);
};

export default ImportPage;
