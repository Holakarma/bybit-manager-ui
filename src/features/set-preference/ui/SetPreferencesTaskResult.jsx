import { TaskResult } from 'entities/task';

const SetPreferencesTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default SetPreferencesTaskResult;
