import { Stack } from '@mui/material';
import { DefaultAccountChecker } from 'entities/account';
import { useMemo } from 'react';
import CoinsChainsPicker from './CoinsChainsPicker';

const RefreshDepositSettings = ({ settings, onSettingsChange }) => {
	const coin = useMemo(() => settings.coin, [settings.coin]);
	const chain = useMemo(() => settings.chain, [settings.chain]);

	return (
		<Stack height="100%">
			<DefaultAccountChecker>
				<CoinsChainsPicker
					coin={coin}
					chain={chain}
					onCoinChange={(newCoin) =>
						onSettingsChange((prev) => ({
							...prev,
							coin: newCoin,
							chain: undefined,
						}))
					}
					onChainChange={(newChain) =>
						onSettingsChange((prev) => ({
							...prev,
							chain: newChain,
						}))
					}
				/>
			</DefaultAccountChecker>
		</Stack>
	);
};

export default RefreshDepositSettings;
