import { List, ListItem, Stack, Typography } from '@mui/material';
import { useLogs } from 'entities/log';
import { useMemo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import formatTime from './../../../shared/lib/formatDate/formatTime';

const LogsList = () => {
	const logs = useLogs.use.logs();

	const allLogs = useMemo(() => {
		return Object.values(logs).reverse().flat();
	}, [logs]);

	const Row = ({ index, style }) => {
		const log = allLogs[index];
		return (
			<div style={style}>
				<ListItem
					key={log.id}
					disablePadding
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<Stack
						direction="row"
						gap={1}
					>
						<Typography
							variant="caption"
							color="textSecondary"
						>
							{log.database_id}
						</Typography>
						<Typography color={log.type}>{log.message}</Typography>
					</Stack>

					<Typography
						variant="caption"
						color="textSecondary"
					>
						{formatTime(new Date(log.time))}
					</Typography>
				</ListItem>
			</div>
		);
	};

	return (
		<List sx={{ minWidth: '100%', height: '100%' }}>
			{allLogs.length === 0 ? (
				<Typography
					variant="Captopn"
					color="textSecondary"
				>
					No logs for this session
				</Typography>
			) : (
				<AutoSizer>
					{({ height, width }) => (
						<FixedSizeList
							height={height}
							width={width}
							itemCount={allLogs.length}
							itemSize={25}
							overscanCount={8}
						>
							{Row}
						</FixedSizeList>
					)}
				</AutoSizer>
			)}
		</List>
	);
};

export default LogsList;
