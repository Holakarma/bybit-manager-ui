import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { FINANCE_ACCOUNT_TYPE_TITLE } from 'entities/finance-account';
import CoinsList from './CoinsList';

const TransferSettings = ({ settings, onSettingsChange, databaseIds }) => {
	const setCoinSymbols = (newCoinSymbols) => {
		onSettingsChange((prev) => ({ ...prev, coinSymbols: newCoinSymbols }));
	};

	const handleChangeTransfer = () => {
		onSettingsChange((prev) => ({ ...prev, from: prev.to, to: prev.from }));
		setCoinSymbols([]);
	};

	return (
		<Stack
			gap={2}
			height="100%"
		>
			<Stack
				direction="row"
				alignItems="baseline"
				gap={5}
			>
				<TextField
					label="From"
					variant="standard"
					value={FINANCE_ACCOUNT_TYPE_TITLE[settings.from]}
					disabled
					fullWidth
				/>
				<IconButton onClick={handleChangeTransfer}>
					<CurrencyExchangeRoundedIcon />
				</IconButton>
				<TextField
					label="To"
					variant="standard"
					value={FINANCE_ACCOUNT_TYPE_TITLE[settings.to]}
					disabled
					fullWidth
				/>
			</Stack>

			<Box sx={{ flexGrow: 1, position: 'relative' }}>
				<CoinsList
					sx={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						overflow: 'auto',
					}}
					databaseIds={databaseIds}
					settings={settings}
					coinSymbols={settings.coinSymbols}
					setCoinSymbols={setCoinSymbols}
				/>
			</Box>
		</Stack>
	);
};

export default TransferSettings;
