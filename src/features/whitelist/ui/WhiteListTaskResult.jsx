import { TaskResult } from 'entities/task';

const WhiteListTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default WhiteListTaskResult;
