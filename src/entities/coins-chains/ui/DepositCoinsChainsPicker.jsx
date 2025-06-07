import {
	Box,
	FormControl,
	InputLabel,
	Select,
	Skeleton,
	Stack,
	Tooltip,
} from '@mui/material';
import { SetDefaultAccountButton } from 'entities/account';
import useDepositCoinChain from '../model/depositCoinsChainsStore';
import DepositChainPicker from './DepositChainPicker';
import DepositCoinPicker from './DepositCoinPicker';

const DepositCoinsChainsPicker = ({
	defaultAccountId,
	isSessionFetching,
	isAccountAlive,
	deadAccountComponent,
}) => {
	const coin = useDepositCoinChain.use.coin();
	const chain = useDepositCoinChain.use.chain();
	const setCoin = useDepositCoinChain.use.setCoin();
	const setChain = useDepositCoinChain.use.setChain();

	if (isSessionFetching) {
		return (
			<Skeleton
				variant="rounded"
				width={367}
				height="100%"
			/>
		);
	}

	if (!isAccountAlive) {
		return (
			deadAccountComponent || (
				<Stack
					direction="row"
					alignItems="center"
					gap={2}
				>
					<Tooltip
						disableInteractive={false}
						slotProps={{
							tooltip: {
								sx: {
									maxWidth: 430,
								},
							},
						}}
						title="Click to choose one."
					>
						<Box>
							<SetDefaultAccountButton
								description={
									'Default account with session is required.'
								}
								color="error"
								variant="outlined"
							/>
						</Box>
					</Tooltip>
				</Stack>
			)
		);
	}
	return (
		<Stack
			direction="row"
			alignItems="center"
			gap={2}
		>
			<DepositCoinPicker
				defaultAccountId={defaultAccountId}
				onChange={(_event, newValue) => {
					setCoin(newValue);
					setChain(null);
				}}
				coin={coin}
				sx={{ width: 200 }}
			/>
			{coin ? (
				<DepositChainPicker
					defaultAccountId={defaultAccountId}
					onChange={(_event, newValue) => setChain(newValue)}
					chain={chain}
					coin={coin}
					sx={{ width: 200 }}
				/>
			) : (
				<FormControl
					disabled
					size="small"
					sx={{
						width: '150px',
					}}
				>
					<InputLabel id="deposit-chain-picker">Chain</InputLabel>
					<Select
						labelId="deposit-chain-picker"
						label="Chain"
					></Select>
				</FormControl>
			)}
		</Stack>
	);
};

export default DepositCoinsChainsPicker;
