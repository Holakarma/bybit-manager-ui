const usd = (balance, precision = 2) => {
	const num = Number(balance);

	if (isNaN(num)) return balance;

	if (num === 0) return '$0';

	const minValue = Math.pow(10, -precision);

	if (num < minValue) {
		return `<$${minValue.toFixed(precision)}`;
	}

	return `$${num.toFixed(precision)}`;
};

export default usd;
