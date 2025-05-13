import { Button } from '@mui/material';
import { useSetAliveDefaultAccount } from 'entities/account';
import { useState } from 'react';

const SetDefaultAccountButton = (props) => {
	const setDefaultAccount = useSetAliveDefaultAccount();
	const [total, setTotal] = useState(-1);
	const onTotalGet = (total) => {
		setTotal(total);
	};

	const setDefaultAccountWithCookie = () => {
		setDefaultAccount.mutate({ onTotalGet });
	};

	return (
		<Button
			{...props}
			onClick={setDefaultAccountWithCookie}
			disabled={setDefaultAccount.isError}
			loading={setDefaultAccount.isPending}
			loadingPosition="start"
		>
			{setDefaultAccount.isPending
				? `Finding alive account${total === -1 ? '' : ` from ${total}`}`
				: setDefaultAccount.isError
					? 'No alive account found'
					: 'Choose the first account with session'}
		</Button>
	);
};

export default SetDefaultAccountButton;
