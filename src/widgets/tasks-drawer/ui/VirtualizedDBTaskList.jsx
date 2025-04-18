import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import TaskItem from './TaskItem';

const VirtualizedDBTaskList = ({ groupedTasks, onTaskClick }) => {
	const pages = useMemo(() => {
		return Object.keys(groupedTasks);
	}, [groupedTasks]);

	const [currentPage, setCurrentPage] = useState(0);
	const [pageDate, setPageDate] = useState(pages[0]);

	const handleNextPage = () => {
		setCurrentPage((prevPage) => prevPage + 1);
		setPageDate(pages[currentPage + 1]);
	};

	const handlePrevPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
		setPageDate(pages[currentPage - 1]);
	};

	const Row = ({ index, style }) => {
		const task = groupedTasks[pageDate][index];
		return (
			<div style={{ ...style, paddingInline: '16px' }}>
				<TaskItem
					onClick={() => onTaskClick(task)}
					task={task}
				/>
			</div>
		);
	};

	return (
		<Stack height="100%">
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				paddingInline={2}
				paddingBlock={1}
			>
				{/* Date Pagination */}
				<Stack
					direction="row"
					alignItems="center"
					gap={1}
				>
					<IconButton
						size="small"
						disabled={currentPage === 0}
						onClick={handlePrevPage}
					>
						<NavigateNextRoundedIcon
							sx={{ transform: 'rotate(180deg)' }}
						/>
					</IconButton>
					<Typography
						variant="caption"
						color="textSecondary"
					>
						{pageDate}
					</Typography>
					<IconButton
						size="small"
						disabled={currentPage === pages.length - 1}
						onClick={handleNextPage}
					>
						<NavigateNextRoundedIcon />
					</IconButton>
				</Stack>

				<Typography
					variant="caption"
					color="textSecondary"
				>
					{groupedTasks[pageDate].length} tasks
				</Typography>
			</Stack>

			{/* Tasks */}
			<Box flexGrow={1}>
				<AutoSizer>
					{({ height, width }) => (
						<FixedSizeList
							height={height}
							width={width}
							itemCount={groupedTasks[pageDate].length}
							itemSize={65}
							overscanCount={5}
						>
							{Row}
						</FixedSizeList>
					)}
				</AutoSizer>
				{/* No tasks */}

				{groupedTasks[pageDate].length === 0 && (
					<Stack
						justifyContent="center"
						alignItems="center"
					>
						<Typography
							variant="body2"
							color="textSecondary"
						>
							No tasks today
						</Typography>
					</Stack>
				)}
			</Box>
		</Stack>
	);
};

export default VirtualizedDBTaskList;
