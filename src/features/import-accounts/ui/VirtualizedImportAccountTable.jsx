import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useCallback, useState } from 'react';
import useAccounts from '../model/accountsToImportStore';
import AccountHeader from './AccountHeader';
import AccountRow from './AccountRow';

const ROW_HEIGHT = 48;
const MAX_CONTAINER_HEIGHT = 370;
const OFFSET = 2;
const visibleRowCount = Math.ceil(MAX_CONTAINER_HEIGHT / ROW_HEIGHT);

const VirtualizedImportAccountTable = ({ sx, ...props }) => {
	const accounts = useAccounts.use.accounts();
	const editAccount = useAccounts.use.editAccount();

	const [visibleRange, setVisibleRange] = useState({
		startIndex: 0,
		endIndex: visibleRowCount,
	});

	const handleScroll = useCallback(
		(event) => {
			const newScroll = event.currentTarget.scrollTop;
			const newStartIndex = Math.floor(newScroll / ROW_HEIGHT);
			const newEndIndex = newStartIndex + visibleRowCount;
			setVisibleRange((prevState) =>
				prevState.startIndex === newStartIndex
					? prevState
					: {
							startIndex:
								newStartIndex < OFFSET
									? 0
									: newStartIndex - OFFSET,
							endIndex:
								newEndIndex + OFFSET > accounts.length - 1
									? accounts.length
									: newEndIndex + OFFSET,
						},
			);
		},
		[accounts],
	);

	return (
		<TableContainer
			sx={{
				maxHeight: MAX_CONTAINER_HEIGHT,
				overflowY: 'auto',
				...sx,
			}}
			onScroll={handleScroll}
			{...props}
		>
			<Table sx={{ minWidth: 650 }}>
				<AccountHeader />
				<TableBody
					sx={{
						position: 'relative',
						height: accounts.length * ROW_HEIGHT,
					}}
				>
					{accounts.map((account, i) =>
						i < visibleRange.startIndex ||
						i > visibleRange.endIndex ? null : (
							<AccountRow
								key={account.id}
								sx={{
									position: 'absolute',
									top: `${i * ROW_HEIGHT}px`,
									height: ROW_HEIGHT,
								}}
								account={account}
								onEdit={(updatedAccount) =>
									editAccount(i, updatedAccount)
								}
							/>
						),
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default VirtualizedImportAccountTable;
