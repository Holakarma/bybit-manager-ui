import {
	Box,
	Button,
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Modal,
	Stack,
	Typography,
} from '@mui/material';
import { createAccountObject, useAccounts } from 'features/import-accounts';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { readExcelSheets } from 'shared/lib/read-excel-file';
import { ModalBody, ModalBodyBackground } from 'shared/ui/modal-body';
import AccountExcelDTO from '../model/accountExcelDTO';

const UploadAccounts = ({ file }) => {
	const { enqueueSnackbar } = useSnackbar();
	const addAccount = useAccounts.use.addAccount();
	const accounts = useAccounts.use.accounts();

	/* Modal */
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const [sheets, setSheets] = useState(null);
	const [selectedSheets, setSelectedSheets] = useState(null);
	const handleOpen = () => {
		readExcelSheets(file).then((sheets) => {
			setSheets(sheets);
			setSelectedSheets(Object.keys(sheets));
		});

		setOpen(true);
	};

	const handleError = (msg) => {
		enqueueSnackbar(msg, {
			variant: 'warning',
		});
	};

	const uploadHandler = (sheets) => {
		for (var [sheetName, sheet] of Object.entries(sheets)) {
			if (!selectedSheets.includes(sheetName)) continue;

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
		handleClose();
	};

	const handleToggle = (sheetName) => () => {
		const currentIndex = selectedSheets.indexOf(sheetName);
		const newChecked = [...selectedSheets];

		if (currentIndex === -1) {
			newChecked.push(sheetName);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setSelectedSheets(newChecked);
	};

	const getGroups = (sheet) => {
		const groupsNames = {};

		const groupNameIndex = sheet[0].indexOf('[bybit] Group');

		sheet.slice(1).forEach((row) => {
			if (groupsNames[row[groupNameIndex]]) {
				groupsNames[row[groupNameIndex]]++;
			} else {
				groupsNames[row[groupNameIndex]] = 1;
			}
		});

		return Object.entries(groupsNames)
			.map(([name, count]) => `${name}: ${count}`)
			.join(', ');
	};

	return (
		<>
			<Button
				sx={{ padding: '1px !important' }}
				onClick={handleOpen}
			>
				Upload
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<ModalBody minWidth="600px">
					<ModalBodyBackground>
						<Stack
							gap={2}
							height="100%"
						>
							<Typography variant="H5">
								Selecting sheets
							</Typography>

							<Box
								sx={{
									flexGrow: 1,
									position: 'relative',
								}}
							>
								<List
									sx={{
										position: 'absolute',
										top: 0,
										bottom: 0,
										right: 0,
										left: 0,
										overflowY: 'auto',
									}}
								>
									{selectedSheets &&
										Object.entries(sheets).map(
											([sheetName, sheet]) => {
												const labelId = `checkbox-list-sheet-${sheetName}`;

												return (
													<ListItem
														disablePadding
														key={sheetName}
														direction="row"
													>
														<ListItemButton
															onClick={handleToggle(
																sheetName,
															)}
															dense
														>
															<ListItemIcon>
																<Checkbox
																	edge="start"
																	checked={selectedSheets.includes(
																		sheetName,
																	)}
																	tabIndex={
																		-1
																	}
																	disableRipple
																	inputProps={{
																		'aria-labelledby':
																			labelId,
																	}}
																/>
															</ListItemIcon>
															<ListItemText
																id={sheetName}
																primary={
																	sheetName
																}
																secondary={getGroups(
																	sheet,
																)}
															/>
														</ListItemButton>
													</ListItem>
												);
											},
										)}
								</List>
							</Box>

							<Button
								onClick={() => uploadHandler(sheets)}
								disabled={!selectedSheets?.length}
							>
								Select sheets
							</Button>
						</Stack>{' '}
					</ModalBodyBackground>
				</ModalBody>
			</Modal>
		</>
	);
};

export default UploadAccounts;
