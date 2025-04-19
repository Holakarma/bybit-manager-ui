import { Button, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import { AccountIcon } from 'shared/assets/icons/account';
import { NoAccountIcon } from 'shared/assets/icons/no-account';
import useAccounts from '../api/getAccounts';
import useDefaultAccount from '../model/defaultAccountStore';

const DefaultAccount = () => {
	const defaultAccountId = useDefaultAccount.use.defaultAccountId();
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();
	const { data: defaultAccountData, isLoading } = useAccounts(
		defaultAccountId && {
			database_ids: [defaultAccountId],
		},
	);

	const defaultAccount = useMemo(() => {
		if (!defaultAccountId) {
			return undefined;
		}
		if (defaultAccountData) {
			return defaultAccountData[0];
		}
	}, [defaultAccountData, defaultAccountId]);

	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};

	const handleTooltipOpen = () => {
		setOpen(true);
	};

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
				startIcon={<NoAccountIcon fill="inherit" />}
			>
				Loading
			</Button>
		);
	}

	if (!defaultAccount) {
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
					loadingPosition="start"
					sx={{
						fill: (theme) => theme.palette.error.main,
						color: (theme) => theme.palette.error.main,
					}}
					startIcon={<NoAccountIcon fill="inherit" />}
				>
					No default account
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
