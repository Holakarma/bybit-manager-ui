import { Button } from '@mui/material';
import { createAccountObject, useAccounts } from 'features/import-accounts';
import { useSnackbar } from 'notistack';
import { readExcelSheets } from 'shared/lib/read-excel-file';
import AccountExcelDTO from '../model/accountExcelDTO';

const UploadAccounts = ({ file }) => {
	const { enqueueSnackbar } = useSnackbar();
	const addAccount = useAccounts.use.addAccount();
	const accounts = useAccounts.use.accounts();
	const readExcel = () => {
		readExcelSheets(file).then(uploadHandler);
	};

	const handleError = (msg) => {
		enqueueSnackbar(msg, {
			variant: 'warning',
		});
	};

	const uploadHandler = (sheets) => {
		for (var [sheetName, sheet] of Object.entries(sheets)) {
			if (sheet.length < 2) {
				handleError(`sheet ${sheetName} is empty`);
				continue;
			}

			const headers = sheet[0];

			sheet.slice(1).forEach((rowData) => {
				const accountData = headers.reduce((acc, header, index) => {
					acc[header] = rowData[index] || undefined;
					return acc;
				}, {});

				if (
					accounts.find(
						(account) =>
							account.bybit_email ===
							accountData['[email] Address'],
					)
				) {
					handleError(
						`Email ${accountData['[email] Address']} is already in the table`,
					);
					return;
				}

				const newAccount = createAccountObject(
					new AccountExcelDTO(accountData),
				);

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
