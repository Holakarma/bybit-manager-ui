import RecentActorsRoundedIcon from '@mui/icons-material/RecentActorsRounded';
import { Badge, IconButton, Stack, Tooltip } from '@mui/material';
import { useSelectedAccounts, useSelectedAccountsId } from 'entities/account';
import { useState } from 'react';
import SelectedAccountsModal from './SelectedAccountsModal';

const SelectedAccounts = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const setSelectedAccountsId =
		useSelectedAccountsId.use.setSelectedAccountsId();

	const handleClose = (accountsIds) => {
		setSelectedAccountsId(accountsIds);
		setOpen(false);
	};

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	if (isError || isLoading) {
		return (
			<Tooltip title="Selected accounts">
				<Stack
					sx={{ height: '100%' }}
					justifyContent="center"
					alignItems="center"
				>
					<IconButton disabled>
						<RecentActorsRoundedIcon />
					</IconButton>
				</Stack>
			</Tooltip>
		);
	}

	return (
		<>
			<Tooltip title="Selected accounts">
				<Stack
					sx={{ height: '100%' }}
					justifyContent="center"
					alignItems="center"
				>
					<IconButton
						onClick={handleOpen}
						disabled={
							isLoading || isError || !selectedAccounts?.length
						}
					>
						<Badge
							badgeContent={selectedAccounts?.length}
							color="primary"
						>
							<RecentActorsRoundedIcon />
						</Badge>
					</IconButton>
				</Stack>
			</Tooltip>

			<SelectedAccountsModal
				open={open}
				onClose={handleClose}
				selectedAccounts={selectedAccounts}
			/>
		</>
	);
};

export default SelectedAccounts;
