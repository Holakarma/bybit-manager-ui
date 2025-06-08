import { cloneElement } from 'react';
import useDefaultAccount from '../model/defaultAccountStore';
import useSessionChecker from './useSessionChecker';

const DefaultAccountChecker = ({ children }) => {
	const defaultAccountId = useDefaultAccount.use.defaultAccountId();
	const { data: isAccountAlive, isLoading } =
		useSessionChecker(defaultAccountId);

	return cloneElement(children, {
		defaultAccountId,
		isSessionFetching: isLoading,
		isAccountAlive,
	});
};

export default DefaultAccountChecker;
