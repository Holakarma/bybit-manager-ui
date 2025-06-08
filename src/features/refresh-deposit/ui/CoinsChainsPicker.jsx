import { Skeleton, Stack } from '@mui/material';
import { NoDefaultAccountWarning } from 'entities/account';
import { DepositChainPicker, DepositCoinPicker } from 'entities/coins-chains';

const CoinsChainsPicker = ({
	defaultAccountId,
	isSessionFetching,
	isAccountAlive,
	coin,
	chain,
	onCoinChange,
	onChainChange,
}) => {
	if (isSessionFetching) {
		return (
			<Skeleton
				variant="rounded"
				height="100%"
			/>
		);
	}

	if (!isAccountAlive) {
		return <NoDefaultAccountWarning />;
	}

	return (
		<Stack
			alignItems="center"
			marginTop={5}
			gap={2}
		>
			<DepositCoinPicker
				defaultAccountId={defaultAccountId}
				onChange={(_event, newValue) => {
					onCoinChange(newValue);
				}}
				coin={coin}
				size="large"
				slotProps={{ popper: undefined }}
			/>

			{coin && (
				<DepositChainPicker
					defaultAccountId={defaultAccountId}
					onChange={(_event, newValue) => {
						onChainChange(newValue);
					}}
					coin={coin}
					chain={chain}
					size="large"
					slotProps={{ popper: undefined }}
				/>
			)}
		</Stack>
	);
};

export default CoinsChainsPicker;
