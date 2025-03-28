import { TaskResult } from 'entities/task';

const LoginTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Successfully logged out"
			{...props}
		/>
	);
};

export default LoginTaskResult;
