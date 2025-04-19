import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import { Button } from '@mui/material';
import { useMemo } from 'react';
import useAccounts from '../api/getAccounts';

const DefaultAccountButton = ({ defaultAccountId, onClick }) => {
	const { data: defaultAccountData, isLoading } = useAccounts({
		database_ids: [defaultAccountId],
	});

	const defaultAccount = useMemo(() => {
		if (!defaultAccountId) {
			return undefined;
		}
		if (defaultAccountData) {
			return defaultAccountData[0];
		}
	}, [defaultAccountData, defaultAccountId]);

	if (isLoading) {
		return (
			<Button
				variant="contained"
				color="secondary"
				loading={isLoading}
				loadingPosition="start"
				sx={{
					fill: (theme) => theme.palette.error.main,
					color: (theme) => theme.palette.error.main,
				}}
				startIcon={<NoAccountsRoundedIcon fill="inherit" />}
			>
				Loading
			</Button>
		);
	}

	return (
		<Button
			variant="contained"
			color="secondary"
			onClick={onClick}
			sx={{
				fill: (theme) => theme.palette.textPrimary.default,
				color: (theme) => theme.palette.textPrimary.default,
			}}
			startIcon={<AccountCircleRoundedIcon fill="inherit" />}
		>
			{defaultAccount.email.address}
		</Button>
	);
};

export default DefaultAccountButton;
