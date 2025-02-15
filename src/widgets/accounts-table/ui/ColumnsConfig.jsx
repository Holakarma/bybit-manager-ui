import { Stack, Typography } from '@mui/material';
import { AccountWarnings, ColumnVisibilityContext } from 'entities/account';
import { MarkList } from 'entities/mark';
import { formatDate, timeDifference } from 'shared/lib/formatDate';
import { obfuscateEmail } from 'shared/lib/obfuscate-email';
import GroupEditCell from './table-parts/GroupEditCell';
import HidingCell from './table-parts/HidingCell';
import NameCell from './table-parts/NameCell';
import ToggleNameHeader from './table-parts/ToggleNameHeader';
import VisibilityChangingHeader from './table-parts/VisibilityChangingHeader';

const columns = (toggleName = false) => [
	{
		field: toggleName ? 'name' : 'id',
		headerName: toggleName ? 'Name' : 'ID',
		minWidth: 130,
		display: 'flex',
		flex: 1,
		editable: toggleName,
		renderHeader: (params) => <ToggleNameHeader params={params} />,
		renderCell: (params) => <NameCell params={params} />,
	},
	{
		field: 'group_name',
		headerName: 'Group',
		width: 240,
		editable: true,
		renderCell: (params) =>
			params.row.group_name || (
				<Stack
					height="100%"
					justifyContent="center"
				>
					<Typography color="textSecondary.default">
						No group
					</Typography>
				</Stack>
			),
		renderEditCell: (params) => <GroupEditCell params={params} />,
	},
	{
		field: 'email',
		headerName: 'Email',
		hideable: false,
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
		field: 'web3_balance',
		headerName: 'Web3',
		width: 160,
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

export default columns;
