import { useQuery } from '@tanstack/react-query';
import {
	transferAccountGeneral,
	transferAccounts2fa,
	transferAccountsRegister,
	useDepositAddresses,
	useTransferDeposit,
	useTransferFinanceAccounts,
} from 'entities/account';
import { useDepositCoinChain } from 'entities/coins-chains';
import { useGetFinanceAccountsDB } from 'entities/finance-account';

const useTransferredRows = ({ layer, accounts, enabled = true }) => {
    const { data: financeAccounts, isLoading: isFinanceLoading } =
        useGetFinanceAccountsDB({
            uids: accounts?.map((a) => a.uid),
            enabled: layer === 'balances',
        });

    const coin = useDepositCoinChain.use.coin();
    const chain = useDepositCoinChain.use.chain();
    const { data: depositAddresses, isLoading: isDepositLoading } =
        useDepositAddresses({
            uids: accounts?.map((a) => a.uid),
            coin_symbol: coin?.symbol,
            chain: chain?.name,
        });

    const transferDepositMutation = useTransferDeposit(accounts);
    const transferBalancesMutation = useTransferFinanceAccounts(accounts);

    const queryFn = async () => {
        switch (layer) {
            case 'general':
                return accounts.map(transferAccountGeneral);
            case 'balances':
                return await transferBalancesMutation.mutateAsync(
                    financeAccounts,
                );
            case 'register':
                return accounts.map(transferAccountsRegister);
            case '2fa':
                return accounts.map(transferAccounts2fa);
            case 'deposit':
                return await transferDepositMutation.mutateAsync(
                    depositAddresses,
                );
            default:
                return accounts.map(transferAccountGeneral);
        }
    };

    const isEnabled = () => {
        if (!enabled) return false;
        // if (layer === 'balances' && !financeAccounts) return false;
        // if (layer === 'deposit' && !depositAddresses) return false;

        return true;
    };

    const query = useQuery({
        queryFn,
        queryKey: ['transfered rows', accounts, layer, depositAddresses],
        enabled: isEnabled,
    });

    return {
        ...query,
        isLoading: query.isLoading || isDepositLoading || isFinanceLoading,
    };
};

export default useTransferredRows;
