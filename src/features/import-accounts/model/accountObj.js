import { uniqueId } from 'shared/lib/generateUniqueId';

const accountObj = {
	note: undefined,
	group: undefined,
	name: undefined,
	ref_code: undefined,
	bybit_email: undefined,
	imap_address: undefined,
	imap_password: undefined,
	web3_mnemonic_phrase: undefined,
	bybit_password: undefined,
	bybit_totp: undefined,
	bybit_proxy: undefined,
	email_proxy: undefined,
	country_code: undefined,
	cookies: undefined,
};
export const createEmptyObject = () => ({
	...accountObj,
	id: uniqueId(),
});

export const createAccountObject = (account) => ({
	...accountObj,
	...account,
	id: uniqueId(),
});
