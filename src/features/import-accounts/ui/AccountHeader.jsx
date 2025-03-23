import { TableCell, TableHead, TableRow } from '@mui/material';

const AccountHeader = () => {
	return (
		<TableHead
			sx={{
				'& th': {
					borderWidth: '2px',
					borderColor: 'secondary.main',
				},
			}}
		>
			<TableRow>
				<TableCell sx={{ padding: '4px' }}>Note</TableCell>
				<TableCell sx={{ padding: '4px' }}>Group name*</TableCell>
				<TableCell sx={{ padding: '4px' }}>Name</TableCell>
				<TableCell sx={{ padding: '4px' }}>Inviter ref code</TableCell>
				<TableCell sx={{ padding: '4px' }}>Bybit address*</TableCell>
				<TableCell sx={{ padding: '4px' }}>IMAP address</TableCell>
				<TableCell sx={{ padding: '4px' }}>IMAP password</TableCell>
				<TableCell sx={{ padding: '4px' }}>Bybit password</TableCell>
				<TableCell sx={{ padding: '4px' }}>TOTP Secret</TableCell>
				<TableCell sx={{ padding: '4px' }}>
					WEB3 Mnemonic Phase
				</TableCell>
				{/* <TableCell sx={{ padding: '4px' }}>Payment password</TableCell> */}
				<TableCell sx={{ padding: '4px' }}>Bybit proxy</TableCell>
				<TableCell sx={{ padding: '4px' }}>Email proxy</TableCell>
				<TableCell sx={{ padding: '4px' }}>Country code</TableCell>
				<TableCell sx={{ padding: '4px' }}>Cookies</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default AccountHeader;
