import { TableCell } from '@mui/material';
import InputTableCell from './InputTableCell';

const AccountCell = ({ inputProps, ...props }) => {
	return (
		<TableCell
			component="th"
			scope="row"
			sx={{ padding: '12px 4px 0' }}
			{...props}
		>
			<InputTableCell {...inputProps} />
		</TableCell>
	);
};

export default AccountCell;
