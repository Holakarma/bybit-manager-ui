import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { taskDB, useGetTasks, usePendingTasks } from 'entities/task';
import { useEffect, useState } from 'react';
import PendingTaskModal from './PendingTaskModal';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

const TaskList = () => {
	const pendingTasks = usePendingTasks.use.tasks();
	const [pendingTask, setPendingTask] = useState(null);
	const handleClosePendingModal = () => setPendingTask(null);

	const { data: tasks, isLoading, isError } = useGetTasks();
	const [task, setTask] = useState(null);
	const handleCloseTaskModal = () => setTask(null);

	const queryClient = useQueryClient();

	useEffect(() => {
		if (pendingTask) {
			const id = pendingTask.id;
			const changingTask = tasks.find((task) => task.taskId === id);

			if (changingTask) {
				setPendingTask(null);
				setTask(changingTask);
			}
		}
	}, [tasks, pendingTask]);

	if (isLoading) {
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
						Loading...
					</Typography>
				</Box>
			</Box>
		);
	}

	if (isError) {
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
						Error while getting tasks
					</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<>
			<Box minWidth="400px">
				<Box
					padding={2}
					paddingTop={4}
				>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography
							variant="Title1"
							color="textSecondary.default"
						>
							Task queue
						</Typography>

						<Tooltip title="Clear history">
							<IconButton
								onClick={async () => {
									await taskDB.clearTasks();
									queryClient.invalidateQueries({
										queryKey: ['tasks'],
									});
								}}
							>
								<ClearRoundedIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Box>
				<Divider />

				{pendingTasks.length || tasks.length ? (
					<List>
						{pendingTasks.map((task) => (
							<ListItem key={task.id}>
								<TaskItem
									onClick={() => {
										setPendingTask(task);
									}}
									task={task}
								/>
							</ListItem>
						))}

						{[...tasks]
							.sort((a, b) => b.timestamp - a.timestamp)
							.map((task) => (
								<ListItem key={task.id}>
									<TaskItem
										onClick={() => {
											setTask(task);
										}}
										task={task}
									/>
								</ListItem>
							))}
					</List>
				) : (
					<Stack
						justifyContent="center"
						alignItems="center"
						p={4}
					>
						<Typography color="textSecondary.default">
							Empty
						</Typography>
					</Stack>
				)}
			</Box>

			<PendingTaskModal
				task={pendingTask}
				open={Boolean(pendingTask)}
				handleClose={handleClosePendingModal}
			/>
			<TaskModal
				task={task}
				open={Boolean(task)}
				handleClose={handleCloseTaskModal}
			/>
		</>
	);
};

export default TaskList;
