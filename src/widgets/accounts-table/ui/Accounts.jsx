import { Stack, Typography } from '@mui/material';
import { useDepositCoinChain } from 'entities/coins-chains';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { usePersistState } from 'shared/lib/react';
import useLayer from '../model/layerStore';
import AccountsTable from './AccountsTable';

const HEIGHTS = {
	5: '380px',
	10: '640px',
	50: '2720px',
	100: '5310px',
};

const Accounts = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [paginationModel, setPaginationModel] = useState({
		page: 0,
		pageSize: 10,
	});
	const [columnWidthModel, setColumnWidthModel] =
		usePersistState('columnWidths');

	const layer = useLayer.use.layer();
	const chain = useDepositCoinChain.use.chain();

	if (layer === 'deposit' && !chain) {
		return (
			<Stack
				sx={{
					height: HEIGHTS[paginationModel.pageSize],
					minHeight: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant="H4">Choose a chain first</Typography>
			</Stack>
		);
	}

	return (
		<div
			style={{
				height: HEIGHTS[paginationModel.pageSize],
				minHeight: '100%',
				width: '100%',
				position: 'relative',
			}}
		>
			<AccountsTable
				columnWidthModel={columnWidthModel}
				onSuccess={() => {
					enqueueSnackbar('Row updated', {
						variant: 'success',
					});
				}}
				onError={(_e) => {
					enqueueSnackbar(`Some error occured`, {
						variant: 'error',
					});
				}}
				onColumnWidthChange={(params) => {
					setColumnWidthModel((prev) => ({
						...prev,
						[params.colDef.field]: params.width,
					}));
				}}
				paginationModel={paginationModel}
				onPaginationModelChange={setPaginationModel}
			/>
		</div>
	);
};

export default Accounts;
