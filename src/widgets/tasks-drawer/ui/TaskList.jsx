import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	Stack,
	Typography,
} from '@mui/material';
import { usePendingTasks } from 'entities/task';

const statusColor = {
	pending: 'warning',
	success: 'success',
	error: 'error',
};

const TaskList = () => {
	const pendingTasks = usePendingTasks.use.tasks();

	console.log(pendingTasks);

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
					Task queue
				</Typography>
			</Box>
			<Divider />

			{pendingTasks.length ? (
				<List>
					{pendingTasks.map((task) => (
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
			) : (
				<Stack
					justifyContent="center"
					alignItems="center"
					p={4}
				>
					<Typography color="textSecondary.default">Empty</Typography>
				</Stack>
			)}
		</Box>
	);
};

export default TaskList;
