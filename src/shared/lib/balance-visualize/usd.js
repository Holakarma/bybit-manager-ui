const usd = (balance, precision = 2) => {
	const num = Number(balance);

	if (isNaN(num)) return balance;

	const minValue = Math.pow(10, -precision);

	if (num < minValue) {
		return `<$${minValue.toFixed(precision)}`;
	}

	return `$${num.toFixed(precision)}`;
};

export default usd;
