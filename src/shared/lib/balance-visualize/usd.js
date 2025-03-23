const usd = (balance, precision = 2) => {
	const num = Number(balance);

	console.log('num', num);
	if (isNaN(num)) return balance;

	if (num < Math.pow(10, -precision))
		return `<$${Math.pow(10, -precision).toFixed(precision)}`;

	return `$${num.toFixed(precision)}`;
};

export default usd;
