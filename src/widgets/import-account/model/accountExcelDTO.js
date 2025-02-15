class AccountExcelDTO {
	constructor(columns) {
		this.note = columns['[bybit] Note'];
		this.group = columns['[bybit] Group'];
		this.name = columns['[bybit] Name'];
		this.ref_code = columns['[bybit] Inviter ref. code'];
		this.bybit_email = columns['[email] Address'];
		this.imap_address = columns['[email] IMAP Address'];
		this.imap_password = columns['[email] IMAP password'];
		this.bybit_password = columns['[bybit] Password'];
		this.bybit_totp = columns['[bybit] TOTP secret'];
		this.bybit_proxy = columns['[bybit] Proxy'];
		this.email_proxy = columns['[email] Proxy'];
		this.country_code = columns['[bybit] Country code'];
		this.cookies = columns['[bybit] Cookies'];
	}
}

export default AccountExcelDTO;
