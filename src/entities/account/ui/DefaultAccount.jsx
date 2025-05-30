import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import { NoAccountIcon } from 'shared/assets/icons/no-account';
import useDefaultAccount from '../model/defaultAccountStore';
import DefaultAccountButton from './DefaultAccountButton';

const DefaultAccount = () => {
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();
	const defaultAccountId = useDefaultAccount.use.defaultAccountId();

	const [open, setOpen] = useState(false);

	const handleTooltipClose = () => {
		setOpen(false);
	};
	const handleTooltipOpen = () => {
		setOpen(true);
	};

	if (!defaultAccountId) {
		return (
			<Tooltip title="right click any account">
				<Button
					variant="error"
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

	return (
		<DefaultAccountButton
			defaultAccountId={defaultAccountId}
			onClick={() => setDefaultAccountId(null)}
		/>
	);
};

export default DefaultAccount;
