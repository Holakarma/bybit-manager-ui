import { TableRow } from '@mui/material';
import AccountCell from './AccountCell';

const AccountRow = ({ account, ...props }) => {
	return (
		<TableRow {...props}>
			<AccountCell
				inputProps={{
					value: account.bybit_email,
					placeholder: 'example@gmail.com',
				}}
			/>
			<AccountCell
				inputProps={{
					value: account.imap_password,
					placeholder: 'IMAP password',
				}}
			/>
			<AccountCell
				inputProps={{
					value: account.imap_address,
					placeholder: 'IMAP address',
				}}
			/>
			<AccountCell
				inputProps={{
					value: account.bybit_password,
					placeholder: 'Bybit password',
				}}
			/>
			<AccountCell
				inputProps={{
					value: account.bybit_proxy,
					placeholder: 'Bybit proxy',
				}}
			/>
			<AccountCell
				inputProps={{
					value: account.email_proxy,
					placeholder: 'Email proxy',
				}}
			/>
		</TableRow>
	);
};

export default AccountRow;
