import { TaskResult } from 'entities/task';

const RefreshTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Finance accounts were updated"
			{...props}
		/>
	);
};

export default RefreshTaskResult;
