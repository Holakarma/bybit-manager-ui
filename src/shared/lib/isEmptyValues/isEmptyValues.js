// eslint-disable-next-line no-unused-vars
const isEmptyValues = ({ id, ...obj }) =>
	Object.values(obj).every((value) => !value);

export default isEmptyValues;
