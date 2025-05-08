import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Skeleton,
} from '@mui/material';
import { FINANCE_ACCOUNT_TYPE_TITLE } from 'entities/finance-account';
import useAccountBalances from '../lib/accountBalances';

const CoinsList = ({
	databaseIds,
	settings,
	coinSymbols,
	setCoinSymbols,
	...props
}) => {
	const accounBalances = useAccountBalances(databaseIds);

	if (!accounBalances) {
		return <Skeleton height="40px" />;
	}

	if (Object.entries(accounBalances[settings.from]).length === 0) {
		return (
			<List>
				<ListItem>
					No balances for {FINANCE_ACCOUNT_TYPE_TITLE[settings.from]}
				</ListItem>
			</List>
		);
	}

	const handleToggle = (value) => () => {
		const currentIndex = coinSymbols.indexOf(value);
		const newChecked = [...coinSymbols];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setCoinSymbols(newChecked);
	};

	return (
		<List {...props}>
			{Object.entries(accounBalances[settings.from]).map(
				([symbol, { balance, count }]) => {
					return (
						<ListItem
							key={symbol}
							disablePadding
						>
							<ListItemButton
								onClick={handleToggle(symbol)}
								selected={coinSymbols.includes(symbol)}
							>
								<ListItemText
									primary={`${symbol} ${balance}`}
									secondary={`${count} accounts`}
								/>
							</ListItemButton>
						</ListItem>
					);
				},
			)}
		</List>
	);
};

export default CoinsList;
