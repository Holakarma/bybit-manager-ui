export const setColumnVisibilityModel = (newVisibility) => {
	localStorage.setItem('visibilityModel', JSON.stringify(newVisibility));
};

const defaultModel = {
	balance: true,
	group_name: true,
	warnings: true,
	session: true,
	marks: true,
	loginCountry: true,
	kyc: true,
	imap: true,
	email_proxy: true,
	onfido_proxy: false,
	sumsub_proxy: false,
	ACCOUNT_TYPE_FUND: true,
	ACCOUNT_TYPE_UNIFIED: true,
	ACCOUNT_TYPE_PLEDGE_LOANS: false,
	ACCOUNT_TYPE_C2C_YBB: false,
	ACCOUNT_TYPE_COPY_PRO: false,
	ACCOUNT_TYPE_COPY_TRADE: false,
	ACCOUNT_TYPE_MARGIN_STAKE: false,
	ACCOUNT_TYPE_FIXED_RATE_LOAN: false,
	ACCOUNT_TYPE_PRE_MARKET_TRADING: false,
};

export const getVisibilityModel = () => {
	const model = localStorage.getItem('visibilityModel');
	if (model) {
		try {
			return JSON.parse(model);
		} catch (e) {
			console.error('Error while getting visibility model: ', e);
		}
	}
	return defaultModel;
};
