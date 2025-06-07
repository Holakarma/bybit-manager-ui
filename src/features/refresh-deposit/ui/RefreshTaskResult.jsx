import { TaskResult } from 'entities/task';

const RefreshTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default RefreshTaskResult;
