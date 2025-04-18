import { TaskResult } from 'entities/task';

const RegisterTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default RegisterTaskResult;
