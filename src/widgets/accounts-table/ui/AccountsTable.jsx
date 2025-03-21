import { DataGrid } from '@mui/x-data-grid';
import { useQueryClient } from '@tanstack/react-query';
import {
	ColumnVisibilityContext,
	ToggleNameContext,
	useDefaultAccount,
	useSelectedAccountsId,
	useUpdateAccountMutation,
} from 'entities/account';
import { useFilter } from 'features/filter-accounts';
import { useMemo, useState } from 'react';
import {
	getVisibilityModel,
	setColumnVisibilityModel,
} from '../lib/visibilityModel';
import columns from './ColumnsConfig';
import tableSx from './tableStyles';

const paginationModel = { page: 0, pageSize: 5 };

const AccountsTable = ({
	initialRows,
	layer,
	additionalColumns,
	onSuccess,
	onError,
}) => {
	const searchEmail = useFilter.use.email();
	const addGroup = useFilter.use.addGroup();
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();
	const setSelectedAccountsId =
		useSelectedAccountsId.use.setSelectedAccountsId();
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();
	const queryClient = useQueryClient();
	const { mutate: update, isPending } = useUpdateAccountMutation();

	const rows = useMemo(() => {
		const searhQuery = searchEmail.toLowerCase();
		if (initialRows) {
			return initialRows.filter((row) => {
				return (
					row.email.toLowerCase().includes(searhQuery) ||
					String(row.id).toLowerCase().includes(searhQuery) ||
					row.name?.toLowerCase().includes(searhQuery)
				);
			});
		}
		return null;
	}, [searchEmail, initialRows]);

	const [visible, setVisible] = useState(
		columns().reduce((acc, col) => ({ ...acc, [col.field]: true }), {}),
	);

	const getInitialToggleName = () => {
		const item = localStorage.getItem('toggleName');
		if (item) {
			try {
				return JSON.parse(item);
			} catch (e) {
				console.error('Error while getting toggle name: ', e);
			}
		}
		return false;
	};
	const [toggleName, setToggleName] = useState(getInitialToggleName());

	const handleRowContextMenu = (event) => {
		event.preventDefault();
		setDefaultAccountId(
			Number(event.currentTarget.getAttribute('data-id')),
		);
	};

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
			name: updatedRow.name || '',
			group_name: updatedRow.group_name || '',
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
						addGroup(updatedRow.group_name || '');
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
						columns={columns(toggleName, layer, additionalColumns)}
						initialState={{
							pagination: { paginationModel },
							columns: {
								columnVisibilityModel: getVisibilityModel(),
							},
						}}
						slotProps={{
							row: {
								onContextMenu: handleRowContextMenu,
								style: { cursor: 'context-menu' },
							},
						}}
						pageSizeOptions={[5, 10]}
						sx={tableSx}
						loading={isPending}
						checkboxSelection
						disableRowSelectionOnClick
						processRowUpdate={processRowUpdate}
						onCellEditStop={(params) => setReason(params.reason)}
						keepNonExistentRowsSelected
						onColumnVisibilityModelChange={(newModel) =>
							setColumnVisibilityModel(newModel)
						}
						onRowSelectionModelChange={(newRowSelectionModel) => {
							setSelectedAccountsId(newRowSelectionModel);
						}}
						rowSelectionModel={selectedAccountsId}
					/>
				</ToggleNameContext.Provider>
			</ColumnVisibilityContext.Provider>
		</>
	);
};

export default AccountsTable;
