import { Box } from '@mui/material';
import { groupedLogs } from 'entities/log';
import { useMemo } from 'react';
import AccountLogsItem from './AccountLogsItem';

const TaskResult = ({ task, ...props }) => {
	const grouped = useMemo(() => groupedLogs(task.logs), [task.logs]);

	return (
		<Box {...props}>
			{Object.entries(grouped).map(([database_id, logs]) => (
				<AccountLogsItem
					logs={logs}
					key={database_id}
					database_id={database_id}
				/>
			))}
		</Box>
	);
};

export default TaskResult;
