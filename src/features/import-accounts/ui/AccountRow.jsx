import AccountCell from './AccountCell';

const fields = [
	{ key: 'note', placeholder: 'Note' },
	{ key: 'group', placeholder: 'Group name', required: true },
	{ key: 'name', placeholder: 'Account name' },
	{ key: 'ref_code', placeholder: "Inviter's code" },
	{
		key: 'bybit_email',
		placeholder: 'example@gmail.com',
		type: 'email',
		required: true,
	},
	{ key: 'imap_address', placeholder: 'IMAP address', type: 'email' },
	{ key: 'imap_password', placeholder: 'IMAP password' },
	{ key: 'bybit_password', placeholder: 'Bybit password' },
	{ key: 'bybit_totp', placeholder: 'TOTP secret' },
	{ key: 'web3_mnemonic_phrase', placeholder: 'W3 Mnemonic Phase' },
	{ key: 'bybit_proxy', placeholder: 'Bybit proxy' },
	{ key: 'email_proxy', placeholder: 'Email proxy' },
	{ key: 'country_code', placeholder: 'Country code' },
	{ key: 'cookies', placeholder: 'Cookies' },
];

const AccountRowCell = ({ columnIndex, account, cellSx, onEdit }) => {
	const field = fields[columnIndex];

	const handleBlur = (event) => {
		const { value } = event.target;
		onEdit({ ...account, [field.key]: value });
	};

	// const isEmpty = useMemo(() => {
	// 	const { id: _id, ...withoutId } = account;

	// 	return !Object.values(withoutId).some((value) => value);
	// }, [account]);

	return (
		<AccountCell
			sx={cellSx}
			inputProps={{
				name: `accounts[${account.id}][${field.key}]`,
				defaultValue: account[field.key],
				// value: _account[field.key],
				type: field.type,
				placeholder: field.placeholder,
				// required: !isEmpty && field.required,
				// onChange: handleChange,
				onBlur: handleBlur,
			}}
		/>
	);
};

export default AccountRowCell;
