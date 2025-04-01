import { TableRow } from '@mui/material';
import { useMemo, useState } from 'react';
import { isEmptyValues } from 'shared/lib/isEmptyValues';
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
		if (!isEmptyValues(account)) {
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
					name: `accounts[${account.id}][note]`,
					value: tempAccount.note,
					placeholder: 'Note',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					required,
					name: `accounts[${account.id}][group]`,
					value: tempAccount.group,
					placeholder: 'Group name',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][name]`,
					value: tempAccount.name,
					placeholder: 'Account name',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][ref_code]`,
					value: tempAccount.ref_code,
					placeholder: "Inviter's code",
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					required,
					name: `accounts[${account.id}][bybit_email]`,
					type: 'email',
					value: tempAccount.bybit_email,
					placeholder: 'example@gmail.com',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][imap_address]`,
					value: tempAccount.imap_address,
					type: 'email',
					placeholder: 'IMAP address',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][imap_password]`,
					value: tempAccount.imap_password,
					placeholder: 'IMAP password',
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
					name: `accounts[${account.id}][bybit_totp]`,
					value: tempAccount.bybit_totp,
					placeholder: 'TOTP secret',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][web3_mnemonic_phrase]`,
					value: tempAccount.web3_mnemonic_phrase,
					placeholder: 'W3 Mnemonic Phase',
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
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][country_code]`,
					value: tempAccount.country_code,
					placeholder: 'Country code',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][cookies]`,
					value: tempAccount.cookies,
					placeholder: 'Cookies',
					onChange: handleChange,
					onBlur: handleBlur,
				}}
			/>
			<AccountCell
				inputProps={{
					name: `accounts[${account.id}][id]`,
					value: tempAccount.id,
					type: 'hidden',
				}}
			/>
		</TableRow>
	);
};

export default AccountRow;
