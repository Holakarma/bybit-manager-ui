import { TableCell } from '@mui/material';
import InputTableCell from './InputTableCell';

const AccountCell = ({ inputProps, ...props }) => {
	return (
		<TableCell
			component="th"
			scope="row"
			sx={
				inputProps?.type !== 'hidden'
					? { padding: '12px 4px 0' }
					: { padding: 0 }
			}
			{...props}
		>
			<InputTableCell inputProps={inputProps} />
		</TableCell>
	);
};

export default AccountCell;
