import { TaskResult } from 'entities/task';

const RegisterTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Successfully registered"
			{...props}
		/>
	);
};

export default RegisterTaskResult;
