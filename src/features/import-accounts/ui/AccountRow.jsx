import { TableRow } from '@mui/material';
import { useMemo, useState } from 'react';
import isAccountEmpty from '../lib/isAccountEmpty';
import AccountCell from './AccountCell';

const AccountRow = ({ account, onEdit, sx, ...props }) => {
	const [tempAccount, setTempAccount] = useState(account);

	const handleChange = (e) => {
		const { name: inputName, value } = e.target;
		const [, , name] = inputName.match(/^accounts\[(\d+-\d+)\]\[(\w+)\]$/);
		setTempAccount((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleBlur = () => {
		onEdit(tempAccount);
	};

	const required = useMemo(() => {
		if (!isAccountEmpty(account)) {
			return true;
		}

		return false;
	}, [account]);

	return (
		<TableRow
			{...props}
			sx={{
				'& td, & th': {
					border: 0,
				},
				...sx,
			}}
		>
			<AccountCell
				inputProps={{
					required,
					name: `accounts[${account.id}][bybit_email]`,
					value: tempAccount.bybit_email,
					placeholder: 'example@gmail.com',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					required,
					name: `accounts[${account.id}][imap_password]`,
					value: tempAccount.imap_password,
					placeholder: 'IMAP password',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][imap_address]`,
					value: tempAccount.imap_address,
					placeholder: 'IMAP address',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][bybit_password]`,
					value: tempAccount.bybit_password,
					placeholder: 'Bybit password',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][bybit_proxy]`,
					value: tempAccount.bybit_proxy,
					placeholder: 'Bybit proxy',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][email_proxy]`,
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
