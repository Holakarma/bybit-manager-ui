import { TaskResult } from 'entities/task';

const LogoutTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default LogoutTaskResult;
