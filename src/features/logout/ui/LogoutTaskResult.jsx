import { TaskResult } from 'entities/task';

const LogoutTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Successfully logged out"
			{...props}
		/>
	);
};

export default LogoutTaskResult;
