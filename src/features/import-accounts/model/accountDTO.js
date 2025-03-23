class AccountDTO {
	constructor(account) {
		this.name = account.name;
		this.note = account.note;
		this.group_name = account.group;
		this.password = account.bybit_password;
		this.totp_secret = account.bybit_totp;
		this.inviter_ref_code = account.ref_code;
		this.web3_mnemonic_phrase = account.web3_mnemonic_phrase;
		this.proxy = account.bybit_proxy;
		this.email = {
			address: account.bybit_email,
			imap_address: account.imap_address,
			imap_password: account.imap_password,
			proxy: account.email_proxy,
		};
		this.cookies = JSON.parse(account.cookies || '[]');
		// country_code: '',
	}

	get bybit_email() {
		return this.email.address;
	}
}

export default AccountDTO;
