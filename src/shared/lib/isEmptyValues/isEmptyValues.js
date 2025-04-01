// eslint-disable-next-line no-unused-vars
const isEmptyValues = ({ id, ...account }) =>
	Object.values(account).every((value) => !value);

export default isEmptyValues;
