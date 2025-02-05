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
				<TableCell sx={{ padding: '4px' }}>Bybit address*</TableCell>
				<TableCell sx={{ padding: '4px' }}>IMAP password*</TableCell>
				<TableCell sx={{ padding: '4px' }}>IMAP address</TableCell>
				<TableCell sx={{ padding: '4px' }}>Bybit password</TableCell>
				<TableCell sx={{ padding: '4px' }}>Bybit proxy</TableCell>
				<TableCell sx={{ padding: '4px' }}>Email proxy</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default AccountHeader;
