import { Stack, Typography } from '@mui/material';
import { ColumnVisibilityContext } from 'entities/account';
import { obfuscateEmail } from 'shared/lib/obfuscate-email';
import GroupEditCell from './cells/GroupEditCell';
import HidingCell from './cells/HidingCell';
import NameCell from './cells/NameCell';
import RegisteredCell from './cells/RegisteredCell';
import ToggleNameHeader from './header-cells/ToggleNameHeader';
import VisibilityChangingHeader from './header-cells/VisibilityChangingHeader';

const getRegisterColumns = (toggleName = false, widths) => [
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
		field: 'registered',
		headerName: 'Registered',
		hideable: false,
		width: widths.registered || 110,
		minWidth: 110,
		maxWidth: 200,
		renderCell: RegisteredCell,
	},
	{
		field: 'ref_code',
		headerName: 'Ref code',
		width: widths.ref_code || 110,
		minWidth: 110,
		maxWidth: 200,
	},
];

export default getRegisterColumns;
