import { Login } from 'features/login';
import { Refresh } from 'features/refresh-balances';
import { Register } from 'features/register';
import { useLayer } from 'widgets/accounts-table';

const MainAction = ({ sx = {}, ...props }) => {
	const layer = useLayer.use.layer();

	if (layer === 'general') {
		return (
			<Login
				sx={{ ...sx, height: '100%' }}
				{...props}
			/>
		);
	}

	if (layer === 'balances') {
		return (
			<Refresh
				sx={{ ...sx, height: '100%' }}
				{...props}
			/>
		);
	}

	if (layer === 'register') {
		return (
			<Register
				sx={{ ...sx, height: '100%' }}
				{...props}
			/>
		);
	}

	return (
		<Login
			sx={{ ...sx, height: '100%' }}
			{...props}
		/>
	);
};

export default MainAction;
