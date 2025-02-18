import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	Typography,
} from '@mui/material';
import { useTasks } from 'entities/task';

const statusColor = {
	pending: 'warning',
	success: 'success',
	error: 'error',
};

const TaskList = () => {
	const tasks = useTasks.use.tasks();

	return (
		<Box minWidth="400px">
			<Box
				padding={2}
				paddingTop={4}
			>
				<Typography
					variant="Title1"
					color="textSecondary.default"
				>
					{tasks.length ? 'Task queue' : 'Empty task queue'}
				</Typography>
			</Box>
			<Divider />

			{tasks.length ? (
				<List>
					{tasks.map((task) => (
						<ListItem key={task.id}>
							<Button
								variant="outlined"
								color="secondary"
								fullWidth
								sx={{ justifyContent: 'space-between' }}
							>
								<Typography>{task.title}</Typography>
								<Typography
									variant="caption"
									color={statusColor[task.status]}
								>
									{task.status}
								</Typography>
							</Button>
						</ListItem>
					))}
				</List>
			) : null}
		</Box>
	);
};

export default TaskList;
