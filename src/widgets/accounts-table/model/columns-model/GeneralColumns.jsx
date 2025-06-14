import { Stack, Typography } from '@mui/material';
import { AccountWarnings, ColumnVisibilityContext } from 'entities/account';
import { MarkList } from 'entities/mark';
import { usd } from 'shared/lib/balance-visualize';
import { formatDate, timeDifference } from 'shared/lib/formatDate';
import { obfuscateEmail } from 'shared/lib/obfuscate-email';
import proxySortComparator from '../../lib/proxySortComparator';
import GroupEditCell from './cells/GroupEditCell';
import HidingCell from './cells/HidingCell';
import NameCell from './cells/NameCell';
import ProxyCell from './cells/ProxyCell';
import ToggleNameHeader from './header-cells/ToggleNameHeader';
import VisibilityChangingHeader from './header-cells/VisibilityChangingHeader';

const getGeneralColumns = (toggleName = false, widths) => [
	{
		field: toggleName ? 'name' : 'id',
		headerName: toggleName ? 'Name' : 'ID',
		minWidth: 50,
		maxWidth: 150,
		width: toggleName ? widths['name'] : widths['id'] || 100,
		editable: toggleName,
		renderHeader: (params) => <ToggleNameHeader params={params} />,
		renderCell: (params) => <NameCell params={params} />,
	},
	{
		field: 'group_name',
		headerName: 'Group',
		editable: true,
		width: widths.group_name || 240,
		minWidth: 115,
		maxWidth: 300,
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
		width: widths.email || 200,
		minWidth: 115,
		maxWidth: 280,
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
		width: widths.imap || 200,
		minWidth: 115,
		maxWidth: 280,
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
		width: widths.balance || 200,
		minWidth: 120,
		maxWidth: 280,
		renderHeader: (params) => <VisibilityChangingHeader params={params} />,
		renderCell: (params) => (
			<HidingCell
				params={params}
				context={ColumnVisibilityContext}
			>
				{usd(params.value)}
			</HidingCell>
		),
	},
	{
		field: 'proxy',
		headerName: 'Proxy',
		width: widths.proxy || 280,
		minWidth: 80,
		maxWidth: 350,
		sortComparator: proxySortComparator,
		renderCell: (params) => <ProxyCell params={params} />,
	},
	{
		field: 'email_proxy',
		headerName: 'Email proxy',
		width: widths.proxy || 280,
		minWidth: 80,
		maxWidth: 350,
		sortComparator: proxySortComparator,
		renderCell: (params) => <ProxyCell params={params} />,
	},
	{
		field: 'onfido_proxy',
		headerName: 'Onfido proxy',
		width: widths.proxy || 280,
		minWidth: 80,
		maxWidth: 350,
		sortComparator: proxySortComparator,
		renderCell: (params) => <ProxyCell params={params} />,
	},
	{
		field: 'sumsub_proxy',
		headerName: 'Sumsub proxy',
		width: widths.proxy || 280,
		minWidth: 80,
		maxWidth: 350,
		sortComparator: proxySortComparator,
		renderCell: (params) => <ProxyCell params={params} />,
	},
	{
		field: 'kyc',
		headerName: 'KYC',
		sortable: false,
		width: widths.kyc || 170,
		minWidth: 80,
		maxWidth: 200,
	},
	{
		field: 'loginCountry',
		headerName: 'Login Country',
		sortable: false,
		width: widths.loginCountry || 170,
		minWidth: 75,
		maxWidth: 200,
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
		width: widths.marks || 100,
		minWidth: 100,
		maxWidth: 200,
		sortable: false,
		renderCell: (params) => <MarkList marks={params.row.marks} />,
	},
	{
		field: 'session',
		headerName: 'Session',
		width: widths.session || 100,
		minWidth: 100,
		maxWidth: 250,
		renderCell: (params) => {
			const date = params.row.session;
			const now = new Date();
			if (!date) return 'No cookies';
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
		width: widths.warnings || 100,
		minWidth: 100,
		maxWidth: 200,
		renderCell: (params) => (
			<AccountWarnings warnings={params.row.warnings} />
		),
	},
];

export default getGeneralColumns;
