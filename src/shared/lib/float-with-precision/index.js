export const floatWithPrecision = (float, precision = 2) => {
	const num = Number(float);

	if (isNaN(num)) return float;

	if (num === 0) return '0';

	return `${num.toFixed(precision)}`;
};
