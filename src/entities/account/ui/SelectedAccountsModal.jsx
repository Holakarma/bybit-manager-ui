import {
	Box,
	Button,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Stack,
} from '@mui/material';
import { useEffect, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { ModalBody, ModalBodyBackground } from 'shared/ui/modal-body';

const SelectedAccountsModal = ({ onClose, open, selectedAccounts }) => {
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
			return [...prev, account.database_id];
		});
	};

	const handleUnselectAll = () => {
		setSelectedAccountsIdsTmp([]);
	};

	const handleSelectAll = () => {
		setSelectedAccountsIdsTmp(
			selectedAccounts.map((account) => account.database_id),
		);
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
						<ModalBodyBackground>
							No selected accounts
						</ModalBodyBackground>
					</ModalBody>
				</Box>
			</Modal>
		);
	}

	const Row = ({ index, style }) => {
		const account = selectedAccounts[index];
		return (
			<ListItem
				disablePadding
				sx={style}
			>
				<ListItemButton
					dense
					onClick={() => handleClick(account)}
					disableRipple
				>
					<ListItemIcon>
						<Checkbox
							edge="start"
							checked={selectedAccountsIdsTmp.includes(
								account.database_id,
							)}
							tabIndex={-1}
							disableRipple
							inputProps={{
								'aria-labelledby': account.database_id,
							}}
						/>
					</ListItemIcon>
					<ListItemText
						id={account.database_id}
						primary={account.email.address}
						secondary={`${account.group_name} ${account.database_id}`}
					/>
				</ListItemButton>
			</ListItem>
		);
	};

	return (
		<Modal
			open={open}
			onClose={() => onClose(selectedAccountsIdsTmp)}
		>
			<ModalBody
				sx={{
					minWidth: '400px',
					overflow: 'auto',
				}}
				position="relative"
			>
				<ModalBodyBackground>
					<Stack height="100%">
						<CardHeader
							subheader={`${selectedAccounts.length} selected`}
						/>

						<CardContent sx={{ flexGrow: 1, position: 'relative' }}>
							<List
								sx={{
									overflow: 'auto',
									position: 'absolute',
									top: '0',
									bottom: '0',
									left: '0',
									right: '0',
								}}
							>
								<AutoSizer>
									{({ height, width }) => (
										<FixedSizeList
											height={height}
											width={width}
											itemCount={selectedAccounts.length}
											itemSize={60}
											overscanCount={10}
										>
											{Row}
										</FixedSizeList>
									)}
								</AutoSizer>
							</List>
						</CardContent>

						<CardActions>
							{selectedAccountsIdsTmp.length === 0 ? (
								<Button
									size="small"
									sx={{ marginLeft: 'auto' }}
									onClick={handleSelectAll}
								>
									select all
								</Button>
							) : (
								<Button
									size="small"
									sx={{ marginLeft: 'auto' }}
									onClick={handleUnselectAll}
								>
									unselect all
								</Button>
							)}
						</CardActions>
					</Stack>
				</ModalBodyBackground>
			</ModalBody>
		</Modal>
	);
};

export default SelectedAccountsModal;
