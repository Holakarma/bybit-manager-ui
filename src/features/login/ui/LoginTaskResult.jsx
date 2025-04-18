import { TaskResult } from 'entities/task';

const LoginTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default LoginTaskResult;
