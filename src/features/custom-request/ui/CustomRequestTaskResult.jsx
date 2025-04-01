import { TaskResult } from 'entities/task';

const Disable2faTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			tooltipText="Disabled 2fa successfully"
			{...props}
		/>
	);
};

export default Disable2faTaskResult;
