import { TableRow } from '@mui/material';
import AccountCell from './AccountCell';

const EmptyAccountRow = ({ ...props }) => {
	return (
		<TableRow {...props}>
			<AccountCell
				inputProps={{
					placeholder: 'example@gmail.com',
				}}
			/>
			<AccountCell
				inputProps={{
					placeholder: 'IMAP password',
				}}
			/>
			<AccountCell
				inputProps={{
					placeholder: 'IMAP address',
				}}
			/>
			<AccountCell
				inputProps={{
					placeholder: 'Bybit password',
				}}
			/>
			<AccountCell
				inputProps={{
					placeholder: 'Bybit proxy',
				}}
			/>
			<AccountCell
				inputProps={{
					placeholder: 'Email proxy',
				}}
			/>
		</TableRow>
	);
};

export default EmptyAccountRow;
