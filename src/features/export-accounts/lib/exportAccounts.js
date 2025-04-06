import templateImportAccount from 'shared/assets/templates/template-import-accounts';
import * as XLSX from 'xlsx';

const exportAccounts = (accounts) => {
	const data = accounts.map((account) => [
		account.note || '', // [bybit] Note
		account.group_name || '', // [bybit] Group
		account.name || '', // [bybit] Name
		account.inviter_ref_code || '', // [bybit] Inviter ref. code
		account.email.address || '', // [email] Address
		account.email.imap_address || '', // [email] IMAP Address
		account.email.imap_password || '', // [email] IMAP password
		account.password || '', // [bybit] Password
		account.totp_secret || '', // [bybit] TOTP secret
		account.web3_mnemonic_phrase || '', // [bybit] Mnemonic phrase
		account.proxy || '', // [bybit] Proxy
		account.email.proxy || '', // [email] Proxy
		account.country || '', // [bybit] Country code
		JSON.stringify(account.cookies), // [bybit] Cookies
	]);

	const exportData = [...templateImportAccount, ...data];
	const worksheet = XLSX.utils.aoa_to_sheet(exportData);

	const now = new Date();
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();

	const hours = String(now.getHours()).padStart(2, '0');
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	const sheetName = `${day}.${month}.${year} ${hours}h${minutes}m${seconds}s`;

	const workbook = XLSX.utils.book_new();

	XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
	const excelBuffer = XLSX.write(workbook, {
		bookType: 'xlsx',
		type: 'array',
	});

	const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = 'export.xlsx';
	link.click();
	URL.revokeObjectURL(url);
};

export default exportAccounts;
