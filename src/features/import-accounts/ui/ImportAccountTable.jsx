import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(
	bybit_email,
	imap_password,
	imap_address,
	bybit_password,
	bybit_proxy,
	email_proxy,
) {
	return {
		bybit_email,
		imap_password,
		imap_address,
		bybit_password,
		bybit_proxy,
		email_proxy,
	};
}

const rows = [
	createData('first_acc@firstmail.com', '12dsSq3fh&k', '', '', '', ''),
];

const ImportAccountTable = () => {
	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }}>
				<TableHead
					sx={{
						'& th': {
							borderWidth: '2px',
							borderColor: 'secondary.main',
						},
					}}
				>
					<TableRow>
						<TableCell>Bybit address*</TableCell>
						<TableCell align="right">IMAP password*</TableCell>
						<TableCell align="right">IMAP address</TableCell>
						<TableCell align="right">Bybit password</TableCell>
						<TableCell align="right">Bybit proxy</TableCell>
						<TableCell align="right">Email proxy</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.bybit_email}
							sx={{
								'& td, & th': {
									border: 0,
								},
							}}
						>
							<TableCell
								component="th"
								scope="row"
							>
								{row.bybit_email}
							</TableCell>
							<TableCell align="right">
								{row.imap_password}
							</TableCell>
							<TableCell align="right">
								{row.imap_address}
							</TableCell>
							<TableCell align="right">
								{row.bybit_password}
							</TableCell>
							<TableCell align="right">
								{row.bybit_proxy}
							</TableCell>
							<TableCell align="right">
								{row.email_proxy}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ImportAccountTable;
