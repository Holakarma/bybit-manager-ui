import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import { Fab, Tooltip } from '@mui/material';
import {
	useAccountsMutation,
	useDepositAddressesMutation,
	useSelectedAccountsId,
} from 'entities/account';
import { useDepositCoinChain } from 'entities/coins-chains';
import { useSnackbar } from 'notistack';

const CopyFab = () => {
	const coin = useDepositCoinChain.use.coin();
	const chain = useDepositCoinChain.use.chain();
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();
	const { enqueueSnackbar } = useSnackbar();

	const accountsMutation = useAccountsMutation();
	const depositAddressesMutation = useDepositAddressesMutation();

	const handleCopy = async () => {
		const accounts = await accountsMutation.mutateAsync({
			database_ids: selectedAccountsId,
		});

		const addresses = await depositAddressesMutation.mutateAsync({
			uids: accounts.map((a) => a.uid).filter(Boolean),
			coin_symbol: coin.symbol,
			chain: chain.name,
		});

		const addressesValues = Object.values(addresses);
		const count = addressesValues.length;

		const hasMemo = addressesValues.some((a) => a.memo);

		const addressesToCopy = hasMemo
			? addressesValues
					.map((a) => [a.address, a.memo].join(':'))
					.join('\n')
			: addressesValues.map((a) => a.address).join('\n');

		if (count) {
			await navigator.clipboard.writeText(addressesToCopy);
		}

		enqueueSnackbar(
			count ? `Copied ${count} addresses` : 'No addresses copied',
			{
				variant: count ? 'success' : 'warning',
			},
		);
	};

	return (
		<Tooltip title="copy addresses to clipboard">
			<Fab
				size="small"
				sx={{ position: 'absolute', bottom: 8, right: 8 }}
				onClick={handleCopy}
				disabled={!selectedAccountsId.length}
			>
				<FileCopyRoundedIcon />
			</Fab>
		</Tooltip>
	);
};

export default CopyFab;
