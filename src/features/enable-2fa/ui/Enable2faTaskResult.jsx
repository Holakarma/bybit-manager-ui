import { TaskResult } from 'entities/task';

const Enable2faTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default Enable2faTaskResult;
