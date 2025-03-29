import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
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
import { useEffect, useMemo, useState } from 'react';
import PendingTaskItem from './PendingTaskItem';
import PendingTaskModal from './PendingTaskModal';
import TaskItem from './TaskItem';
import TaskModal from './TaskModal';

const tooltipSlotProps = {
	popper: {
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, -14],
				},
			},
		],
	},
};

const TaskList = ({ ...props }) => {
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

	const sortedTasks = useMemo(
		() => tasks && [...tasks].sort((a, b) => b.timestamp - a.timestamp),
		[tasks],
	);

	const groupedTasks = useMemo(() => {
		return sortedTasks?.reduce((acc, task) => {
			const date = new Date(task.timestamp).toLocaleDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(task);
			return acc;
		}, {});
	}, [sortedTasks]);

	if (isLoading) {
		return (
			<Box {...props}>
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
			<Box {...props}>
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
			<Box
				height="100%"
				{...props}
			>
				<Stack
					height="100%"
					justifyContent="space-between"
					alignItems="stretch"
				>
					<Box>
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
					</Box>

					<Box sx={{ overflow: 'auto', flexGrow: 1 }}>
						{pendingTasks.length || tasks.length ? (
							<List>
								{pendingTasks.map((task) => (
									<ListItem key={task.id}>
										<PendingTaskItem
											onClick={() => {
												setPendingTask(task);
											}}
											task={task}
										/>
									</ListItem>
								))}

								{Object.entries(groupedTasks).map(
									([date, tasks]) => (
										<Box key={date}>
											<Stack
												direction="row"
												justifyContent="space-between"
												paddingInline={2}
												paddingTop={1}
											>
												<Typography
													variant="caption"
													color="textSecondary"
												>
													{date}
												</Typography>
												<Typography
													variant="caption"
													color="textSecondary"
												>
													{tasks.length} completed
												</Typography>
											</Stack>

											{tasks.map((task) => (
												<ListItem key={task.id}>
													<TaskItem
														onClick={() => {
															setTask(task);
														}}
														task={task}
													/>
												</ListItem>
											))}
										</Box>
									),
								)}
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

					<Box>
						<Divider />
						<Stack
							alignItems="center"
							justifyContent="start"
							direction="row"
							padding={2}
							gap={1}
						>
							<Tooltip
								title="Clear history"
								slotProps={tooltipSlotProps}
							>
								<IconButton
									onClick={async () => {
										await taskDB.clearTasks();
										queryClient.invalidateQueries({
											queryKey: ['tasks'],
										});
									}}
								>
									<DeleteForeverRoundedIcon />
								</IconButton>
							</Tooltip>

							<Tooltip
								title="Export tasks (soon)"
								slotProps={tooltipSlotProps}
							>
								<Box>
									<IconButton disabled>
										<FileUploadRoundedIcon />
									</IconButton>
								</Box>
							</Tooltip>

							<Tooltip
								title="Import tasks (soon)"
								slotProps={tooltipSlotProps}
							>
								<Box>
									<IconButton disabled>
										<FileDownloadRoundedIcon />
									</IconButton>
								</Box>
							</Tooltip>
						</Stack>
					</Box>
				</Stack>
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
