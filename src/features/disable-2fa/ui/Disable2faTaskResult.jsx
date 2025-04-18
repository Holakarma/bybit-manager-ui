import { TaskResult } from 'entities/task';

const Disable2faTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default Disable2faTaskResult;
