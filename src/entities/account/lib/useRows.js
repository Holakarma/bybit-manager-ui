import { FilterDTO, useFilter, usePaginatedAccounts } from 'entities/account';
import { useMemo } from 'react';
import useTransferredRows from './useTransferredRows';

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

	const { data: rows, isLoading: isRowsLoading } = useTransferredRows({
		layer,
		accounts,
		enabled: Boolean(accounts),
	});

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
		isLoading: isLoading || isRowsLoading,
		isError,
	};
};

export default useRows;
