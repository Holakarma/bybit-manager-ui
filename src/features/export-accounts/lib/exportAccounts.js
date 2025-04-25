import { useMutation } from '@tanstack/react-query';
import { useAccount } from 'entities/account';
import templateImportAccount from 'shared/assets/templates/template-import-accounts';
import * as XLSX from 'xlsx';

const useExportAccounts = () => {
	const getAccountMutation = useAccount();

	const mutationFn = async ({ database_ids }) => {
		const accounts = [];

		for (let database_id of database_ids) {
			const account = await getAccountMutation.mutateAsync(database_id);

			accounts.push(account);
		}

		return exportAccounts(accounts);
	};

	return useMutation({
		mutationFn,
		mutaitoinKey: ['export-accounts'],
	});
};

const proxyToUrl = (proxy) =>
	proxy
		? proxy.refresh_url
			? `${proxy.protocol}://${proxy.login}:${proxy.password}@${proxy.host}:${proxy.port}[${proxy.refresh_url}]`
			: `${proxy.protocol}://${proxy.login}:${proxy.password}@${proxy.host}:${proxy.port}`
		: null;

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
		proxyToUrl(account.proxy) || '', // [bybit] Proxy : '', // [bybit] Proxy
		proxyToUrl(account.email.proxy) || '', // [email] Proxy
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

export default useExportAccounts;
