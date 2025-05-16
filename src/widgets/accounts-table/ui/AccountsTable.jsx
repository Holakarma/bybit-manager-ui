import { Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
	ColumnVisibilityContext,
	ToggleNameContext,
	useAccount,
	useDefaultAccount,
	useSelectedAccountsId,
} from 'entities/account';
import { createFinanceAccountsConfig } from 'entities/finance-account';
import { useMemo, useRef, useState } from 'react';
import { usePersistState } from 'shared/lib/react';
import {
	getVisibilityModel,
	setColumnVisibilityModel,
} from '../lib/visibilityModel';
import useLayer from '../model/layerStore';
import useUpdateRow from '../model/updateRow';
import useRows from '../model/useRows';
import columns from './ColumnsConfig';
import tableSx from './tableStyles';

const AccountsTable = ({
	onSuccess,
	onError,
	columnWidthModel,
	onColumnWidthChange,
	paginationModel,
	onPaginationModelChange,
}) => {
	const layer = useLayer.use.layer();
	const { rows, rowCount, isLoading, isError } = useRows({
		paginationModel,
		layer,
	});

	const rowCountRef = useRef(rowCount);
	const savedRowCount = useMemo(() => {
		if (rowCount !== undefined) {
			rowCountRef.current = rowCount;
		}
		return rowCountRef.current;
	}, [rowCount]);

	const rowsRef = useRef(rows);
	const savedRows = useMemo(() => {
		if (rows) {
			rowsRef.current = rows;
		}
		return rowsRef.current;
	}, [rows]);

	const balance = useMemo(() => {
		if (rows) {
			return rows.reduce((acc, account) => acc + account.balance || 0, 0);
		}

		return 0;
	}, [rows]);
	const additionalColumns = useMemo(() => {
		if (layer === 'balances' && rows) {
			return createFinanceAccountsConfig(rows, columnWidthModel);
		}
		return [];
	}, [layer, rows, columnWidthModel]);
	const setDefaultAccountId = useDefaultAccount.use.setDefaultAccountId();
	const setSelectedAccountsId =
		useSelectedAccountsId.use.setSelectedAccountsId();
	const selectedAccountsId = useSelectedAccountsId.use.selectedAccountsId();

	const [visible, setVisible] = useState(
		columns().reduce((acc, col) => ({ ...acc, [col.field]: true }), {}),
	);

	const [toggleName, setToggleName] = usePersistState('toggleName', false);

	const accountMutation = useAccount();
	const handleRowContextMenu = async (event) => {
		event.preventDefault();
		const id = event.currentTarget.getAttribute('data-id');
		const account = await accountMutation.mutateAsync(id);
		if (account.registered) {
			setDefaultAccountId(Number(id));
		}
	};

	const [reason, setReason] = useState(null);

	const updateRowMutation = useUpdateRow({ onError, onSuccess });
	const processRowUpdate = async (updatedRow, originalRow) => {
		if (reason !== 'enterKeyDown') return originalRow;
		try {
			return await updateRowMutation.mutateAsync({
				updatedRow,
				originalRow,
			});
		} catch (_e) {
			return originalRow;
		}
	};

	const memoColumns = useMemo(
		() =>
			columns({
				toggleName,
				layer,
				additionalColumns,
				balance,
				widths: columnWidthModel,
			}),
		[toggleName, layer, additionalColumns, balance, columnWidthModel],
	);

	return (
		<ColumnVisibilityContext.Provider value={[visible, setVisible]}>
			<ToggleNameContext.Provider value={[toggleName, setToggleName]}>
				{isError ? (
					<Stack
						width="100%"
						height="100%"
						alignItems="center"
						justifyContent="center"
					>
						<Typography>Error while getting accounts</Typography>
					</Stack>
				) : (
					<DataGrid
						rows={savedRows}
						columns={memoColumns}
						initialState={{
							pagination: { paginationModel },
							columns: {
								columnVisibilityModel: getVisibilityModel(),
							},
						}}
						paginationMode="server"
						onPaginationModelChange={onPaginationModelChange}
						rowCount={savedRowCount || 0}
						slotProps={{
							row: {
								onContextMenu: handleRowContextMenu,
								style: { cursor: 'context-menu' },
							},
						}}
						pageSizeOptions={[5, 10, 50, 100]}
						sx={tableSx}
						loading={updateRowMutation.isPending || isLoading}
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
						onColumnWidthChange={onColumnWidthChange}
					/>
				)}
			</ToggleNameContext.Provider>
		</ColumnVisibilityContext.Provider>
	);
};

export default AccountsTable;
