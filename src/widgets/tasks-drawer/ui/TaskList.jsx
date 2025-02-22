import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	Stack,
	Typography,
} from '@mui/material';
import { useGetTasks, usePendingTasks } from 'entities/task';
import { useEffect, useState } from 'react';
import { formatDate } from 'shared/lib/formatDate';
import formatTime from 'shared/lib/formatDate/formatTime';
import { Pulsing } from 'shared/ui/pulsing';
import color from '../model/taskStatusColor';
import taskTitle from '../model/taskTitles';
import PendingTaskModal from './PendingTaskModal';
import TaskModal from './TaskModal';

const TaskList = () => {
	const pendingTasks = usePendingTasks.use.tasks();
	const [pendingTask, setPendingTask] = useState(null);
	const handleClosePendingModal = () => setPendingTask(null);

	const { data: tasks, isLoading, isError } = useGetTasks();
	const [task, setTask] = useState(null);
	const handleCloseTaskModal = () => setTask(null);

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
						database error
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
					<Typography
						variant="Title1"
						color="textSecondary.default"
					>
						Task queue
					</Typography>
				</Box>
				<Divider />

				{pendingTasks.length || tasks.length ? (
					<>
						<List>
							{pendingTasks.map((task) => (
								<ListItem key={task.id}>
									<Button
										variant="outlined"
										color="secondary"
										fullWidth
										onClick={() => {
											setPendingTask(task);
										}}
										sx={{ justifyContent: 'space-between' }}
									>
										<Stack
											direction="row"
											gap={1}
											alignItems="baseline"
										>
											<Typography>
												{taskTitle[task.type]}
											</Typography>
											<Typography
												color="textSecondary"
												variant="caption"
											>
												{formatTime(
													new Date(task.startedAt),
												)}
											</Typography>
										</Stack>
										<Stack
											direction="row"
											gap={1}
											alignItems="center"
										>
											<Typography
												variant="caption"
												color="warning"
											>
												pending
											</Typography>
											<Pulsing />
										</Stack>
									</Button>
								</ListItem>
							))}

							{[...tasks]
								.sort((a, b) => b.timestamp - a.timestamp)
								.map((task) => (
									<ListItem key={task.id}>
										<Button
											variant="outlined"
											color="secondary"
											fullWidth
											onClick={() => {
												setTask(task);
											}}
											sx={{
												justifyContent: 'space-between',
											}}
										>
											<Stack
												direction="row"
												gap={1}
												alignItems="baseline"
											>
												<Typography>
													{taskTitle[task.type]}
												</Typography>
												<Typography
													color="textSecondary"
													variant="caption"
												>
													{formatDate(
														new Date(
															task.timestamp,
														),
													)}
												</Typography>
											</Stack>
											<Stack
												direction="row"
												gap={1}
												alignItems="center"
											>
												<Typography
													variant="caption"
													color={color[task.status]}
												>
													{task.status}
												</Typography>
											</Stack>
										</Button>
									</ListItem>
								))}
						</List>
					</>
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
				open={pendingTask}
				handleClose={handleClosePendingModal}
			/>
			<TaskModal
				task={task}
				open={task}
				handleClose={handleCloseTaskModal}
			/>
		</>
	);
};

export default TaskList;
