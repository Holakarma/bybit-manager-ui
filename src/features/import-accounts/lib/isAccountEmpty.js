// eslint-disable-next-line no-unused-vars
const isAccountEmpty = ({ id, ...account }) =>
	Object.values(account).every((value) => !value);

export default isAccountEmpty;
