export const balanceVizualize = (balance) => {
	const num = new Number(balance);

	if (isNaN(num)) return balance;

	if (num < 0.01) return '<0.01';

	return balance;
};
