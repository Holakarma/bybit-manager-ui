import { Login } from 'features/login';
import { Refresh } from 'features/refresh-balances';
import { useLayer } from 'widgets/accounts-table';

const MainAction = () => {
	const layer = useLayer.use.layer();

	if (layer === 'general') {
		return <Login sx={{ height: '100%' }} />;
	}

	if (layer === 'balances') {
		return <Refresh sx={{ height: '100%' }} />;
	}
};

export default MainAction;
