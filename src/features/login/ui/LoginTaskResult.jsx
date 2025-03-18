import { TaskResult } from 'entities/task';

const LoginTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Cookies were updated"
			{...props}
		/>
	);
};

export default LoginTaskResult;
