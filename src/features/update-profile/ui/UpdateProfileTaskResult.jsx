import { TaskResult } from 'entities/task';

const UpdateProfileTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default UpdateProfileTaskResult;
