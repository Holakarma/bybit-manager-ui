import { Avatar } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { VariableSizeListbox } from 'shared/ui/virtualized-listbox';
import useCoinsChains from '../api/depositCoinsChains';
import ChainRow from './ChainRow';
import CoinsPicker from './CoinsPicker';

const DepositChainPicker = ({
	defaultAccountId,
	onChange,
	coin,
	chain,
	...props
}) => {
	const { data: coinChains, isLoading } = useCoinsChains({
		database_id: defaultAccountId,
		coin_symbol: coin.symbol,
	});

	const chains = useMemo(() => {
		if (coinChains) {
			return coinChains[0].chains;
		}
	}, [coinChains]);

	useEffect(() => {
		if (chains && !chain) {
			onChange(null, chains[0]);
		}
	}, [chains, chain, onChange]);

	return (
		<CoinsPicker
			options={chains || []}
			disabled={chains?.length === 1}
			loading={isLoading}
			getOptionLabel={(option) => option.full_name || ''}
			isOptionEqualToValue={(option, value) =>
				option.full_name === value.full_name
			}
			listboxComponent={VariableSizeListbox}
			renderRow={ChainRow}
			itemSize={90}
			slotProps={{
				popper: {
					style: { width: 350 },
				},
			}}
			startAdornment={
				chain?.icon_night ? (
					<Avatar
						src={chain.icon_night}
						sx={{
							width: 24,
							height: 24,
						}}
					/>
				) : null
			}
			onChange={onChange}
			value={chain || ''}
			label="Chain"
			{...props}
		/>
	);
};

export default DepositChainPicker;
