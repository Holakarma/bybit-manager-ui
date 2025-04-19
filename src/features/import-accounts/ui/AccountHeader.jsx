import { Box } from '@mui/material';

const headers = [
	'Note',
	'Group name*',
	'Name',
	'Inviter ref code',
	'Bybit address*',
	'IMAP address',
	'IMAP password',
	'Bybit password',
	'TOTP Secret',
	'WEB3 Mnemonic Phase',
	'Bybit proxy',
	'Email proxy',
	'Country code',
	'Cookies',
];

const AccountHeaderCell = ({ columnIndex, cellSx }) => {
	return <Box sx={cellSx}>{headers[columnIndex]}</Box>;
};

export default AccountHeaderCell;
