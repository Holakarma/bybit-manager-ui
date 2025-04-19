import { Box } from '@mui/material';
import InputTableCell from './InputTableCell';

const AccountCell = ({ inputProps, ...props }) => {
	return (
		<Box {...props}>
			<InputTableCell inputProps={inputProps} />
		</Box>
	);
};

export default AccountCell;
