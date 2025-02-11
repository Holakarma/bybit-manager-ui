import { Button } from '@mui/material';
import { useAccounts } from 'features/import-accounts';
import { useSnackbar } from 'notistack';
import { readExcelSheets } from 'shared/lib/read-excel-file';

const UploadAccounts = ({ file }) => {
	const { enqueueSnackbar } = useSnackbar();
	const addAccount = useAccounts.use.addAccount();
	const accounts = useAccounts.use.accounts();
	const readExcel = () => {
		readExcelSheets(file).then(uploadHandler);
	};

	const handleError = (msg) => {
		enqueueSnackbar(msg, {
			variant: 'error',
		});
	};

	const handleSuccess = (msg) => {
		enqueueSnackbar(msg, {
			variant: 'success',
		});
	};

	const uploadHandler = (sheets) => {
		for (var [sheetName, sheet] of Object.entries(sheets)) {
			if (sheet.length < 3) {
				handleError(`sheet ${sheetName} is empty`);
				continue;
			}

			sheet.slice(2).forEach((accountData) => {
				const bybit_email = accountData[4];

				if (
					accounts.find(
						(account) => account.bybit_email === bybit_email,
					)
				) {
					handleError(`email ${bybit_email} is already in table`);
					return;
				}
				const newAccount = {
					bybit_email: bybit_email,
					imap_password: accountData[6],
					imap_address: accountData[5],
					bybit_password: accountData[7],
					bybit_proxy: accountData[9],
					email_proxy: accountData[10],
				};
				addAccount(newAccount);
			});
		}
	};

	return (
		<Button
			sx={{ padding: '1px !important' }}
			onClick={readExcel}
		>
			Upload
		</Button>
	);
};

export default UploadAccounts;
