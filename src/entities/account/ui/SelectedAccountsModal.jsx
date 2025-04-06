import {
	Box,
	Checkbox,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Modal,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalBody } from 'shared/ui/modal-body';

const SelectedAccountsModal = ({
	onClose,
	open,
	selectedAccounts,
	// unselect,
}) => {

	const [selectedAccountsIdsTmp, setSelectedAccountsIdsTmp] = useState(
		selectedAccounts.map((account) => account.database_id),
	);

	useEffect(() => {
		setSelectedAccountsIdsTmp(
			selectedAccounts.map((account) => account.database_id),
		);
	}, [selectedAccounts]);

	const handleClick = (account) => {
		setSelectedAccountsIdsTmp((prev) => {
			if (prev.find((item) => item === account.database_id)) {
				return prev.filter((item) => item !== account.database_id);
			}
			return [...prev, account];
		});
	};

	if (!selectedAccounts) {
		return (
			<Modal
				open={open}
				onClose={onClose}
			>
				<Box>
					<ModalBody
						sx={{ minWidth: '400px' }}
						position="relative"
					>
						aaaa
					</ModalBody>
				</Box>
			</Modal>
		);
	}

	return (
		<Modal
			open={open}
			onClose={() => onClose(selectedAccountsIdsTmp)}
		>
			<Box>
				<ModalBody
					sx={{
						minWidth: '400px',
						maxHeight: '500px',
						overflow: 'auto',
					}}
					position="relative"
				>
					<Typography
						variant="caption"
						color="textSecondary"
					>
						{selectedAccounts.length} selected
					</Typography>
					<List
						sx={{
							width: '100%',
							maxWidth: 360,
							bgcolor: 'background.paper',
						}}
					>
						{selectedAccounts.map((account) => (
							<ListItem
								key={account.database_id}
								disablePadding
							>
								{/* <ListItemButton
									role={undefined}
									dense
								> */}
								<ListItemIcon>
									<Checkbox
										onChange={() => handleClick(account)}
										edge="start"
										checked={selectedAccountsIdsTmp.includes(
											account.database_id,
										)}
										tabIndex={-1}
										disableRipple
										inputProps={{
											'aria-labelledby':
												account.database_id,
										}}
									/>
								</ListItemIcon>
								<ListItemText
									id={account.database_id}
									primary={account.email.address}
								/>
								{/* </ListItemButton> */}
							</ListItem>
						))}{' '}
					</List>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default SelectedAccountsModal;
