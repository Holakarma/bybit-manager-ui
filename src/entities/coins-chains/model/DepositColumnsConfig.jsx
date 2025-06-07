import { Typography } from '@mui/material';
import { formatDate } from 'shared/lib/formatDate';

const depositColumnsConfig = (rows, widths) => {
	let columns = [
		{
			field: 'address',
			headerName: 'Address',
			minWidth: 100,
			maxWidth: 400,
			width: widths['address'] || 400,
		},

		{
			field: 'remark',
			headerName: 'Remark',
			minWidth: 100,
			maxWidth: 150,
			width: widths['remark'] || 100,
		},
		{
			field: 'created_at',
			headerName: 'Created',
			minWidth: 100,
			maxWidth: 175,
			width: widths['created_at'] || 175,
			renderCell: (params) => {
				const date = params.row.created_at;
				return (
					<Typography variant="body">
						{date && formatDate(new Date(date))}
					</Typography>
				);
			},
		},
	];

	if (rows.some((row) => row.memo)) {
		columns.splice(0, 0, {
			field: 'memo',
			headerName: 'Memo',
			minWidth: 100,
			maxWidth: 150,
			width: widths['memo'] || 100,
		});
	}

	return columns;
};

export default depositColumnsConfig;
