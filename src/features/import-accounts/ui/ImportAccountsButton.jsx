import { Box, Button } from '@mui/material';
import useAccounts from '../model/accountsToImportStore';

const ImportAccountsButton = ({ buttonProps, ...props }) => {
	const accounts = useAccounts.use.accounts();

	if (!accounts.slice(1).length) {
		return null;
	}

	return (
		<Box
			pt={2}
			textAlign="end"
			{...props}
		>
			<Button
				variant="contained"
				color="primary"
				type="submit"
				loadingIndicator="Importing..."
				{...buttonProps}
			>
				Start import
			</Button>
		</Box>
	);
};

export default ImportAccountsButton;
