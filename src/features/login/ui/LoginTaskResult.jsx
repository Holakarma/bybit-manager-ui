import { TaskResult } from 'entities/task';

const LoginTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Successfully logged in"
			{...props}
		/>
	);
};

export default LoginTaskResult;
