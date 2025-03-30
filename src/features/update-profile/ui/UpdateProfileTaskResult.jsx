import { TaskResult } from 'entities/task';

const UpdateProfileTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Successfully updated"
			{...props}
		/>
	);
};

export default UpdateProfileTaskResult;
