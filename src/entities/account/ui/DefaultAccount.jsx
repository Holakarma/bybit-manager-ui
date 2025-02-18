import { Button, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import { AccountIcon } from 'shared/assets/icons/account';
import { NoAccountIcon } from 'shared/assets/icons/no-account';
import useGetAccountsQuery from '../hooks/useGetAccountsQuery';
import useDefaultAccount from '../model/defaultAccountStore';

const DefaultAccount = () => {
	const defaultAccountId = useDefaultAccount.use.defaultAccountId();
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();
	const { data: accounts, isLoading, isError } = useGetAccountsQuery();

	const defaultAccount = useMemo(() => {
		if (accounts && defaultAccountId) {
			const account = accounts.find(
				(account) => account.database_id === defaultAccountId,
			);

			return account;
		}
		return null;
	}, [accounts, defaultAccountId]);

	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

	if (!defaultAccount || isError || isLoading) {
		return (
			<Tooltip
				onClose={handleTooltipClose}
				open={open}
				disableHoverListener
				title="Just right-click account in table"
				slotProps={{
					popper: {
						disablePortal: true,
					},
				}}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleTooltipOpen}
					loading={isLoading}
					loadingPosition="start"
					sx={{
						fill: (theme) => theme.palette.error.main,
						color: (theme) => theme.palette.error.main,
					}}
					startIcon={<NoAccountIcon fill="inherit" />}
				>
					{isError ? 'Error' : 'No default account'}
				</Button>
			</Tooltip>
		);
	}
	if (defaultAccount) {
		return (
			<Button
				variant="contained"
				color="secondary"
				onClick={() => setDefaultAccountId(null)}
				sx={{
					fill: (theme) => theme.palette.textPrimary.default,
					color: (theme) => theme.palette.textPrimary.default,
				}}
				startIcon={<AccountIcon fill="inherit" />}
			>
				{defaultAccount.email.address}
			</Button>
		);
	}
};

export default DefaultAccount;
