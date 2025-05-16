import {
	transferAccountGeneral,
	transferAccounts2fa,
	transferAccountsRegister,
	transferFinanceAccounts,
	usePaginatedAccounts,
} from 'entities/account';
import { useGetFinanceAccountsDB } from 'entities/finance-account';
import { FilterDTO, useFilter } from 'features/filter-accounts';
import { useMemo } from 'react';

const useRows = ({ paginationModel, layer }) => {
	const groups = useFilter.use.groups();
	const search = useFilter.use.search();
	const filter = useFilter.use.filter();

	const { filterBody, only_with_secure_token } = useMemo(() => {
		const { only_with_secure_token, ...body } = new FilterDTO(filter);

		return { filterBody: body, only_with_secure_token };
	}, [filter]);

	const queryBody = {
		...filterBody,
	};
	if (groups.length) {
		queryBody.groups = groups;
	}
	if (layer === 'register') {
		queryBody.registered = [null, false];
	}

	const {
		data: paginatedAccounts,
		error,
		isLoading,
		isError,
	} = usePaginatedAccounts({
		body: queryBody,
		only_with_secure_token,
		page: paginationModel.page + 1,
		offset: paginationModel.pageSize,
	});

	const { accounts, rowCount } = useMemo(() => {
		if (paginatedAccounts) {
			return {
				accounts: paginatedAccounts.result,
				rowCount: paginatedAccounts.total,
			};
		}

		return { accounts: undefined, rowCount: undefined };
	}, [paginatedAccounts]);

	const { data: financeAccounts, isLoading: isFinanceAccountsLoading } =
		useGetFinanceAccountsDB(accounts?.map((account) => account.uid));

	const rows = useMemo(() => {
		if (accounts && financeAccounts) {
			switch (layer) {
				case 'general':
					return accounts.map(transferAccountGeneral);
				case 'balances':
					return accounts.map((account) =>
						transferFinanceAccounts(
							account,
							financeAccounts[account.uid],
						),
					);
				case 'register':
					return accounts.map(transferAccountsRegister);
				case '2fa':
					return accounts.map(transferAccounts2fa);
				default:
					return accounts.map(transferAccountGeneral);
			}
		}
		return null;
	}, [accounts, layer, financeAccounts]);

	const filtered = useMemo(() => {
		if (rows && search) {
			const string = search.trim();
			return rows.filter(
				(row) =>
					row.id == string ||
					row.name?.includes(string) ||
					row.group_name?.includes(string) ||
					row.email?.includes(string),
			);
		}
		return rows;
	}, [rows, search]);

	return {
		rows: filtered,
		rowCount,
		error,
		isLoading,
		isError,
		isFinanceAccountsLoading,
	};
};

export default useRows;
