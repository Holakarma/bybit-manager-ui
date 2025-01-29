const marks = {
	can_participate_demo_trading_tournament: 'dtt',
	can_participate_tokensplash: 'ts',
	can_participate_airdrophunt: 'ah',
	can_participate_launchpool: 'lp',
	ido_risk_control: 'ido',
};

const getMarksArray = (account) => {
	let result = [];

	for (var [key, val] of Object.entries(marks)) {
		if (account[key]) {
			result.push({ name: val, status: 'success' });
		} else if (account[key] === false) {
			result.push({ name: val, status: 'error' });
		}
	}

	return result;
};

export default getMarksArray;
