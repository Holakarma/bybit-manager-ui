import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { VariableSizeListbox } from 'shared/ui/virtualized-listbox';
import useCoinsChains from '../api/depositCoinsChains';
import CoinRow from './CoinRow';
import CoinsPicker from './CoinsPicker';

const DepositCoinPicker = ({ defaultAccountId, onChange, coin, ...props }) => {
	const { data: coinsChains, isLoading } = useCoinsChains({
		database_id: defaultAccountId,
	});

	useEffect(() => {
		if (coinsChains && !coin) {
			const usdtCoin = coinsChains.find((coin) => coin.symbol === 'USDT');

			if (usdtCoin) {
				onChange(null, usdtCoin);
			}
		}
	}, [coinsChains, onChange, coin]);

	return (
		<CoinsPicker
			options={coinsChains || []}
			loading={isLoading}
			getOptionLabel={(option) => option.symbol || ''}
			isOptionEqualToValue={(option, value) =>
				option.symbol === value.symbol
			}
			listboxComponent={VariableSizeListbox}
			renderRow={CoinRow}
			slotProps={{
				popper: {
					style: { width: 350 },
				},
			}}
			startAdornment={
				coin?.icon_night ? (
					<Avatar
						src={coin.icon_night}
						sx={{
							width: 24,
							height: 24,
						}}
					/>
				) : null
			}
			onChange={onChange}
			value={coin || ''}
			{...props}
		/>
	);
};

export default DepositCoinPicker;
