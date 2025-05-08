import { TaskResult } from 'entities/task';

const TransferTaskResult = ({ task, ...props }) => {
	return (
		<TaskResult
			task={task}
			{...props}
		/>
	);
};

export default TransferTaskResult;
