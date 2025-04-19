import { Box, Stack } from '@mui/material';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import useAccounts from '../model/accountsToImportStore';
import AccountHeaderCell from './AccountHeader';
import AccountRowCell from './AccountRow';

const TABLE_WIDTH = 2800;
const CELLS_COUNT = 14;

const cellSx = { padding: 1, flexGrow: 1, width: TABLE_WIDTH / CELLS_COUNT };

const ImportAccountTable = ({ ...props }) => {
	const accounts = useAccounts.use.accounts();
	const editAccount = useAccounts.use.editAccount();

	const Cell = ({ columnIndex, rowIndex, style }) => {
		if (rowIndex === 0) {
			return (
				<div style={style}>
					<AccountHeaderCell
						columnIndex={columnIndex}
						cellSx={cellSx}
					/>
				</div>
			);
		}

		const account = accounts[rowIndex - 1];
		return (
			<div style={style}>
				<AccountRowCell
					columnIndex={columnIndex}
					account={account}
					cellSx={cellSx}
					onEdit={(updatedAccount) =>
						editAccount(rowIndex - 1, updatedAccount)
					}
				/>
			</div>
		);
	};

	return (
		<Stack
			justifyContent="space-between"
			alignItems="end"
			height="100%"
			position="relative"
			{...props}
		>
			<Stack
				position="absolute"
				overflow="auto"
				top={0}
				bottom={0}
				left={0}
				right={0}
			>
				<Box flexGrow={1}>
					<AutoSizer>
						{({ height, width }) => (
							<FixedSizeGrid
								height={height}
								width={width}
								columnCount={CELLS_COUNT}
								columnWidth={TABLE_WIDTH / CELLS_COUNT}
								rowCount={accounts.length + 1} // + heeader
								rowHeight={40}
								overscanRowCount={5}
								overscanColumnCount={2}
							>
								{Cell}
							</FixedSizeGrid>
						)}
					</AutoSizer>
				</Box>
			</Stack>
		</Stack>
	);
};

export default ImportAccountTable;
