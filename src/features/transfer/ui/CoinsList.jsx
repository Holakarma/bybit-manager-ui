import {
	Avatar,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Skeleton,
	Stack,
} from '@mui/material';
import { FINANCE_ACCOUNT_TYPE_TITLE } from 'entities/finance-account';
import { floatWithPrecision } from 'shared/lib/float-with-precision';
import useAccountBalances from '../lib/accountBalances';

const CoinsList = ({
	databaseIds,
	settings,
	coinSymbols,
	setCoinSymbols,
	...props
}) => {
	const accounBalances = useAccountBalances({
		databaseIds,
		from: settings.from,
		to: settings.to,
	});

	if (!accounBalances) {
		return (
			<List {...props}>
				<ListItem disablePadding>
					<Skeleton
						height="72px"
						width="100%"
					/>
				</ListItem>
				<ListItem disablePadding>
					<Skeleton
						height="72px"
						width="100%"
					/>
				</ListItem>
				<ListItem disablePadding>
					<Skeleton
						height="72px"
						width="100%"
					/>
				</ListItem>
			</List>
		);
	}

	if (Object.entries(accounBalances).length === 0) {
		return (
			<List>
				<ListItem>
					No balances for {FINANCE_ACCOUNT_TYPE_TITLE[settings.from]}
				</ListItem>
			</List>
		);
	}

	const handleToggle = (symbol, ids) => () => {
		const currentIndex = coinSymbols.findIndex(
			(sym) => sym.symbol === symbol,
		);
		const newChecked = [...coinSymbols];

		if (currentIndex === -1) {
			newChecked.push({ symbol, ids });
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setCoinSymbols(newChecked);
	};

	return (
		<List {...props}>
			{Object.entries(accounBalances).map(
				([symbol, { balance, balance_usd, icon, precision, ids }]) => {
					return (
						<ListItem
							key={symbol}
							disablePadding
						>
							<ListItemButton
								onClick={handleToggle(symbol, ids)}
								selected={Boolean(
									coinSymbols.find(
										(sym) => sym.symbol === symbol,
									),
								)}
							>
								<ListItemAvatar>
									<Avatar
										alt={symbol}
										src={icon}
									/>
								</ListItemAvatar>

								<Stack
									direction="row"
									justifyContent="space-between"
									width="100%"
								>
									<ListItemText
										primary={`${symbol}`}
										secondary={`${ids.length} accounts`}
									/>
									<ListItemText
										primary={`${floatWithPrecision(balance, precision)}`}
										secondary={`$${balance_usd}`}
										slotProps={{
											primary: {
												textAlign: 'end',
											},
											secondary: {
												textAlign: 'end',
											},
										}}
									/>
								</Stack>
							</ListItemButton>
						</ListItem>
					);
				},
			)}
		</List>
	);
};

export default CoinsList;
