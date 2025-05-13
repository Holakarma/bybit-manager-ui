import { CreateTask, TaskAccountsPage } from 'entities/task';
import { default as useExportAccounts } from '../lib/exportAccounts';

const ExportAccounts = ({ children, onClose }) => {
	const mutation = useExportAccounts();

	return (
		<CreateTask
			handleStart={mutation.mutate}
			task="export"
			preloginNeeded={false}
			onClose={onClose}
			pages={[
				{
					title: 'Accounts',
					component: <TaskAccountsPage key="accounts" />,
				},
			]}
			startTitle="Export"
		>
			{children}
		</CreateTask>
	);
};

export default ExportAccounts;
