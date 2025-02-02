import { DataGrid } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';
import {
	ColumnVisibilityContext,
	ToggleNameContext,
	useUpdateAccountMutation,
} from 'entities/account';
import { useFilter } from 'features/filter-accounts';
import { useMemo, useState } from 'react';
import columns from './ColumnsConfig';
import tableSx from './tableStyles';

const paginationModel = { page: 0, pageSize: 5 };

const AccountsTable = ({ initialRows, onSuccess, onError }) => {
	const searchEmail = useFilter.use.email();
	const addGroup = useFilter.use.addGroup();
	const queryClient = useQueryClient();
	const { mutate: update, isPending } = useUpdateAccountMutation();

	const rows = useMemo(() => {
		if (initialRows) {
			return initialRows.filter((row) => {
				return row.email
					.toLowerCase()
					.includes(searchEmail.toLowerCase());
			});
		}
		return null;
	}, [searchEmail, initialRows]);

	const [visible, setVisible] = useState(
		columns().reduce((acc, col) => ({ ...acc, [col.field]: true }), {}),
	);

	const [toggleName, setToggleName] = useState(false);

	const computeMutation = (newRow, oldRow) => {
		if (newRow.name !== oldRow.name) {
			return `name`;
		}
		if (newRow.group_name !== oldRow.group_name) {
			return `group_name`;
		}
		return null;
	};

	const [reason, setReason] = useState(null);
	const processRowUpdate = (updatedRow, originalRow) => {
		if (reason !== 'enterKeyDown') return originalRow;
		const mutation = computeMutation(updatedRow, originalRow);
		if (!mutation) return originalRow;

		const row = {
			id: originalRow.id,
			name: updatedRow.name,
			group_name: updatedRow.group_name,
		};

		return new Promise((resolve, _reject) => {
			update(row, {
				onSuccess: (data) => {
					onSuccess(data);

					queryClient.invalidateQueries({
						queryKey: ['accounts'],
					});
					queryClient.invalidateQueries({
						queryKey: ['groups'],
					});
					if (mutation === 'group_name') {
						addGroup(updatedRow.group_name);
					}
					resolve(updatedRow);
				},
				onError: (e) => {
					onError(e);
					resolve(originalRow);
				},
			});
		});
	};

	return (
		<>
			<ColumnVisibilityContext.Provider value={[visible, setVisible]}>
				<ToggleNameContext.Provider value={[toggleName, setToggleName]}>
					<DataGrid
						rows={rows}
						columns={columns(toggleName)}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10]}
						checkboxSelection
						sx={tableSx}
						loading={isPending}
						disableRowSelectionOnClick
						processRowUpdate={processRowUpdate}
						onCellEditStop={(params) => setReason(params.reason)}
					/>
				</ToggleNameContext.Provider>
			</ColumnVisibilityContext.Provider>
		</>
	);
};

export default AccountsTable;
