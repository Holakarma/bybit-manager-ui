import { TableRow } from '@mui/material';
import { useState } from 'react';
import AccountCell from './AccountCell';

const AccountRow = ({ account, onEdit }) => {
	const [tempAccount, setTempAccount] = useState(account);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTempAccount((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleBlur = () => {
		onEdit(tempAccount);
	};

	return (
		<TableRow
			sx={{
				'& td, & th': {
					border: 0,
				},
			}}
		>
			<AccountCell
				inputProps={{
					name: 'bybit_email',
					value: tempAccount.bybit_email,
					placeholder: 'example@gmail.com',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: 'imap_password',
					value: tempAccount.imap_password,
					placeholder: 'IMAP password',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: 'imap_address',
					value: tempAccount.imap_address,
					placeholder: 'IMAP address',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: 'bybit_password',
					value: tempAccount.bybit_password,
					placeholder: 'Bybit password',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: 'bybit_proxy',
					value: tempAccount.bybit_proxy,
					placeholder: 'Bybit proxy',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: 'email_proxy',
					value: tempAccount.email_proxy,
					placeholder: 'Email proxy',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
		</TableRow>
	);
};

export default AccountRow;
