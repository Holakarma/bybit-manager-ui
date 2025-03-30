import { TaskResult } from 'entities/task';

const Enable2faTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Enabled 2fa successfully"
			{...props}
		/>
	);
};

export default Enable2faTaskResult;
