import { Alert, Box, Snackbar, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';
import {
	AccountWarnings,
	ColumnVisibilityContext,
	ToggleNameContext,
	useUpdateAccountMutation,
} from 'entities/account';
import { MarkList } from 'entities/mark';
import { useFilter } from 'features/filter-accounts';
import { useContext, useMemo, useState } from 'react';
import { formatDate, timeDifference } from 'shared/lib/formatDate';
import { obfuscateEmail } from 'shared/lib/obfuscate-email';
import HidingCell from './HidingCell';
import tableSx from './tableStyles';
import VisibilityChangingHeader from './VisibilityChangingHeader';

const columns = (toggleName = false) => [
	{
		field: toggleName ? 'name' : 'id',
		headerName: toggleName ? 'Name' : 'ID',
		width: 130,
		editable: toggleName,
		renderHeader: (params) => <ToggleNameHeader params={params} />,
		renderCell: (params) => <NameCell params={params} />,
	},
	{
		field: 'group_name',
		headerName: 'Group',
		width: 240,
		editable: true,
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 240,
		renderHeader: (params) => <VisibilityChangingHeader params={params} />,
		renderCell: (params) => (
			<HidingCell
				params={params}
				hidingFn={obfuscateEmail}
				context={ColumnVisibilityContext}
			>
				{params.value}
			</HidingCell>
		),
	},
	{
		field: 'imap',
		headerName: 'Imap',
		width: 240,
		renderHeader: (params) => <VisibilityChangingHeader params={params} />,
		renderCell: (params) => (
			<HidingCell
				params={params}
				hidingFn={obfuscateEmail}
				context={ColumnVisibilityContext}
			>
				{params.value}
			</HidingCell>
		),
	},
	{
		field: 'balance',
		headerName: 'Balance',
		width: 170,
		renderHeader: (params) => <VisibilityChangingHeader params={params} />,
		renderCell: (params) => (
			<HidingCell
				params={params}
				context={ColumnVisibilityContext}
			>
				{params.value}
			</HidingCell>
		),
	},
	{
		field: 'kyc',
		headerName: 'KYC',
		sortable: false,
		width: 170,
	},
	{
		field: 'loginCountry',
		headerName: 'Login Country',
		sortable: false,
		width: 175,
		renderHeader: (params) => <VisibilityChangingHeader params={params} />,
		renderCell: (params) => (
			<HidingCell
				params={params}
				context={ColumnVisibilityContext}
			>
				{params.value}
			</HidingCell>
		),
	},
	{
		field: 'marks',
		headerName: 'Marks',
		width: 290,
		sortable: false,
		renderCell: (params) => <MarkList marks={params.row.marks} />,
	},
	{
		field: 'session',
		headerName: 'Session',
		width: 200,
		renderCell: (params) => {
			const date = params.row.session;
			const now = new Date();
			if (date === null) return 'No cookies';
			return now > date ? (
				'Expired'
			) : (
				<Stack
					direction="row"
					gap={1}
				>
					<Typography variant="body">{formatDate(date)}</Typography>
					<Typography
						variant="body"
						color="textSecondary"
					>
						{'(' + timeDifference(now, date) + ')'}
					</Typography>
				</Stack>
			);
		},
	},
	{
		field: 'warnings',
		headerName: 'Warnings',
		sortable: false,
		width: 120,
		renderCell: (params) => (
			<AccountWarnings warnings={params.row.warnings} />
		),
	},
];

const ToggleNameHeader = ({ params }) => {
	const [_toggleName, setToggleName] = useContext(ToggleNameContext);
	const clickHandler = (e) => {
		e.stopPropagation();
		setToggleName((prev) => !prev);
	};

	return <Box onClick={clickHandler}>{params.colDef.headerName}</Box>;
};

const NameCell = ({ params }) => {
	const [toggleName] = useContext(ToggleNameContext);
	return toggleName && params.row.name ? (
		params.row.name
	) : (
		<Stack
			height="100%"
			justifyContent="center"
		>
			<Typography color="textSecondary">{params.row.id}</Typography>
		</Stack>
	);
};

const paginationModel = { page: 0, pageSize: 5 };

// @TODO: HidingCell and VisibilityChangingHeader should be in the shared layer as table components
// @TODO: I dont like react context API here, mb it is possible to do with Zustant

const AccountsTable = ({ initialRows }) => {
	const searchEmail = useFilter.use.email();
	const group = useFilter.use.group();
	const queryClient = useQueryClient();
	const { mutate: update, isPending } = useUpdateAccountMutation();

	const [snackbar, setSnackbar] = useState({
		message: 'Some Error occured. Try again',
		severity: 'error',
	});
	const [open, setOpen] = useState(false);
	const handleClose = (_event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const rows = useMemo(() => {
		if (initialRows) {
			return initialRows.filter((row) => {
				return (
					row.email
						.toLowerCase()
						.includes(searchEmail.toLowerCase()) &&
					row.group_name.toLowerCase() === group
				);
			});
		}
		return null;
	}, [searchEmail, initialRows, group]);

	const [visible, setVisible] = useState(
		columns().reduce((acc, col) => ({ ...acc, [col.field]: true }), {}),
	);

	const [toggleName, setToggleName] = useState(false);

	const computeMutation = (newRow, oldRow) => {
		if (newRow.name !== oldRow.name) {
			return `Name from '${oldRow.name}' to '${newRow.name}'`;
		}
		if (newRow.group_name !== oldRow.group_name) {
			return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
		}
		return null;
	};

	const processRowUpdate = (updatedRow, originalRow) => {
		if (!updatedRow.name?.trim()) {
			setSnackbar({
				message: 'You can not leave name field empty',
				severity: 'error',
			});
			setOpen(true);
			return originalRow;
		}
		if (!updatedRow.group_name?.trim()) {
			setSnackbar({
				message: 'You can not leave group field empty',
				severity: 'error',
			});
			setOpen(true);
			return originalRow;
		}
		const mutation = computeMutation(updatedRow, originalRow);
		if (!mutation) {
			return originalRow;
		}

		return new Promise((resolve, _reject) => {
			update(
				{
					id: originalRow.id,
					name: updatedRow.name,
					group_name: updatedRow.group_name,
				},
				{
					onSettled: () => {
						setSnackbar({
							message: `Row updated!`,
							severity: 'success',
						});
						setOpen(true);
						queryClient.invalidateQueries(['accounts']);
						resolve(updatedRow);
					},
					onError: (e) => {
						setSnackbar({
							message: `Some error occured: ${e.message}`,
							severity: 'error',
						});
						setOpen(true);
						resolve(originalRow);
					},
				},
			);
		});
	};

	return (
		<>
			<ColumnVisibilityContext.Provider value={[visible, setVisible]}>
				<ToggleNameContext.Provider value={[toggleName, setToggleName]}>
					<DataGrid
						rows={rows}
						columns={columns(toggleName)}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10]}
						checkboxSelection
						sx={tableSx}
						loading={isPending}
						hideFooter
						disableRowSelectionOnClick
						// onCellEditStop={cellEdit}
						processRowUpdate={processRowUpdate}
					/>
				</ToggleNameContext.Provider>
			</ColumnVisibilityContext.Provider>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<Alert
					severity={snackbar.severity}
					variant="filled"
					sx={{ wisth: '100%' }}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</>
	);
};

export default AccountsTable;
