import { DefaultAccountChecker } from 'entities/account';
import { DepositCoinsChainsPicker } from 'entities/coins-chains';

const DepositCoinsChains = () => {
	return (
		<DefaultAccountChecker>
			<DepositCoinsChainsPicker />
		</DefaultAccountChecker>
	);
};

export default DepositCoinsChains;
