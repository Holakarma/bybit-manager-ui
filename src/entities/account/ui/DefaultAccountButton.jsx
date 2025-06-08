import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import { Button, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import { isCookieAlive } from 'shared/lib/session-cookies';
import useAccounts from '../api/getAccounts';

const DefaultAccountButton = ({ defaultAccountId, onClick }) => {
	const {
		data: defaultAccountData,
		isLoading,
		isError,
	} = useAccounts({
		body: { database_ids: [defaultAccountId] },
	});

	const [warning, setWarning] = useState('');

	const defaultAccount = useMemo(() => {
		if (!defaultAccountId) {
			return undefined;
		}
		if (defaultAccountData) {
			if (!isCookieAlive(defaultAccountData[0].cookies)) {
				setWarning('Account is not alive');
			} else {
				setWarning('');
			}
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
	if (isError) {
		return (
			<Button
				variant="contained"
				disabled
				startIcon={<NoAccountsRoundedIcon fill="inherit" />}
			>
				Error
			</Button>
		);
	}

	return (
		<Tooltip title={warning}>
			<Button
				variant={warning ? 'outlined' : 'contained'}
				color={warning ? 'warning' : 'secondary'}
				onClick={onClick}
				startIcon={
					warning ? (
						<ErrorRoundedIcon />
					) : (
						<AccountCircleRoundedIcon />
					)
				}
			>
				{defaultAccount.email.address}
			</Button>
		</Tooltip>
	);
};

export default DefaultAccountButton;
