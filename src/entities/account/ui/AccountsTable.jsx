import { IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { MarkList } from 'entities/mark';
import React, { useState } from 'react';
import { EyeIcon } from 'shared/assets/icons/eye';
import { HiddenEyeIcon } from 'shared/assets/icons/hidden-eye';
import { obfuscateEmail } from 'shared/lib/obfuscate-email';

const initialColumns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'group', headerName: 'Group', width: 240 },
	{
		field: 'email',
		headerName: 'Email',
		width: 240,
		renderHeader: (params) => <VisibilityChangingHeader params={params} />,
		renderCell: (params) => (
			<HidingCell
				params={params}
				hidingFn={obfuscateEmail}
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
			<HidingCell params={params}>{params.value}</HidingCell>
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
			<HidingCell params={params}>{params.value}</HidingCell>
		),
	},
	{
		field: 'marks',
		headerName: 'Marks',
		width: 290,
		sortable: false,
		renderCell: (_params) => (
			<MarkList marks={['TS', 'LPD', 'DTT', 'LP', 'AH', 'IDO']}>
				TS
			</MarkList>
		),
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

const rows = [
	{
		id: 1,
		group: 'Success',
		email: 'first_acc@firstmail.com',
		imap: 'first_acc@firstmail.com',
		balance: '$101.5 $50.0',
		kyc: 'BGD 1',
		loginCountry: 'RU 192.168.0.1',
		marks: 'TS LPD DTT LP AH IDO',
		session: '21.01.2025 15:52 (59h09m)',
		warnings: 'a a',
	},
	{
		id: 2,
		group: 'Success',
		email: 'second_acc@firstmail.com',
		imap: 'second_acc@firstmail.com',
		balance: '$101.5 $50.0',
		kyc: 'BGD 1',
		loginCountry: 'RU 192.168.0.1',
		marks: 'TS LPD DTT LP AH IDO',
		session: '21.01.2025 15:52 (59h09m)',
		warnings: 'a a',
	},
	{
		id: 3,
		group: 'Success',
		email: 'third_acc@firstmail.com',
		imap: 'thirdd_acc@firstmail.com',
		balance: '$101.5 $50.0',
		kyc: 'BGD 1',
		loginCountry: 'RU 192.168.0.1',
		marks: 'TS LPD DTT LP AH IDO',
		session: '21.01.2025 15:52 (59h09m)',
		warnings: 'a a',
	},
];

const HidingCell = ({ params, hidingFn }) => {
	const { field } = params;
	const [visible] = React.useContext(ColumnVisibilityContext);

	return visible[field]
		? params.value
		: hidingFn
			? hidingFn(params.value)
			: '****';
};

const VisibilityChangingHeader = ({ params }) => {
	const { field } = params;
	const [visible, setVisible] = React.useContext(ColumnVisibilityContext);

	const toggleColumn = () => {
		setVisible((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	return (
		<Stack
			alignItems="center"
			direction="row"
			gap={1}
		>
			{params.colDef.headerName}
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					toggleColumn();
				}}
			>
				{visible[field] ? (
					<EyeIcon size="18px" />
				) : (
					<HiddenEyeIcon size="18px" />
				)}
			</IconButton>
		</Stack>
	);
};
const ColumnVisibilityContext = React.createContext();

const paginationModel = { page: 0, pageSize: 5 };

const AccountsTable = () => {
	const [visible, setVisible] = useState(
		initialColumns.reduce(
			(acc, col) => ({ ...acc, [col.field]: true }),
			{},
		),
	);

	const columns = initialColumns.map((col) =>
		visible[col.field] ? col : { ...col, hide: true },
	);
	return (
		<ColumnVisibilityContext.Provider value={[visible, setVisible]}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{ border: 0, flexGrow: 1 }}
				hideFooter
				// density="compact"
			/>
		</ColumnVisibilityContext.Provider>
	);
};

export default AccountsTable;
