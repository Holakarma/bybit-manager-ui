import { Box, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { MarkList } from 'entities/mark';
import { useContext, useMemo, useState } from 'react';
import { obfuscateEmail } from 'shared/lib/obfuscate-email';
import useSearch from '../model/filterStore';
import ToggleNameContext from '../model/toggleNameContext';
import ColumnVisibilityContext from '../model/visibilityContext';
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
		field: 'group',
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
		renderCell: (_params) => <MarkList marks={_params.row.marks} />,
	},
	{
		field: 'session',
		headerName: 'Session',
		width: 200,
	},
	{
		field: 'warnings',
		headerName: 'Warnings',
		sortable: false,
		width: 120,
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
	const [toggleName, _setToggleName] = useContext(ToggleNameContext);
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
	const searchEmail = useSearch.use.email();

	const rows = useMemo(() => {
		if (initialRows) {
			return initialRows.filter((row) => {
				return row.email
					.toLowerCase()
					.includes(searchEmail.toLowerCase());
			});
		}
		return null;
	}, [searchEmail, initialRows]);

	const [visible, setVisible] = useState(
		columns().reduce((acc, col) => ({ ...acc, [col.field]: true }), {}),
	);

	const [toggleName, setToggleName] = useState(false);

	return (
		<ColumnVisibilityContext.Provider value={[visible, setVisible]}>
			<ToggleNameContext.Provider value={[toggleName, setToggleName]}>
				<DataGrid
					rows={rows}
					columns={columns(toggleName)}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5, 10]}
					checkboxSelection
					sx={tableSx}
					hideFooter
					processRowUpdate={(updatedRow, originalRow) => {
						if (!updatedRow.name?.trim()) return originalRow;
						if (!updatedRow.group?.trim()) return originalRow;
						updatedRow.name = updatedRow.name.trim();
						updatedRow.group = updatedRow.group.trim();
						return updatedRow;
					}}
				/>
			</ToggleNameContext.Provider>
		</ColumnVisibilityContext.Provider>
	);
};

export default AccountsTable;
