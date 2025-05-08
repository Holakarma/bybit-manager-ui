import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import IntegrationInstructionsRoundedIcon from '@mui/icons-material/IntegrationInstructionsRounded';
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
import AllTasksModal from './AllTasksModal';
import PendingTaskItem from './PendingTaskItem';
import PendingTaskModal from './PendingTaskModal';
import TaskModal from './TaskModal';
import VirtualizedDBTaskList from './VirtualizedDBTaskList';

const TaskList = ({ ...props }) => {
	const pendingTasks = usePendingTasks.use.tasks();
	const [pendingTask, setPendingTask] = useState(null);
	const handleClosePendingModal = () => setPendingTask(null);

	const [allTasks, setAllTasks] = useState(null);
	const handleCloseAllTasksModal = () => setAllTasks(null);

	const { data: tasks, isLoading, isError } = useGetTasks();
	const [task, setTask] = useState(null);
	const handleCloseTaskModal = () => setTask(null);

	const queryClient = useQueryClient();

	useEffect(() => {
		if (pendingTask) {
			const id = pendingTask.id;
			const changingTask = tasks.find((task) => task.id === id);

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
		return sortedTasks?.reduce(
			(acc, task) => {
				const date = new Date(task.timestamp).toLocaleDateString();
				if (!acc[date]) {
					acc[date] = [];
				}
				acc[date].push(task);
				return acc;
			},
			{ [new Date().toLocaleDateString()]: [] },
		);
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
						<Stack
							padding={2}
							paddingTop={4}
							direction="row"
							justifyContent="space-between"
						>
							<Typography
								variant="Title1"
								color="textSecondary.default"
							>
								Task queue
							</Typography>

							<Tooltip title="Logs">
								<IconButton
									color="textSecondary"
									onClick={() => setAllTasks(true)}
								>
									<IntegrationInstructionsRoundedIcon />
								</IconButton>
							</Tooltip>
						</Stack>
						<Divider />
					</Box>

					<Box sx={{ overflow: 'hidden', flexGrow: 1 }}>
						{pendingTasks.length || tasks.length ? (
							<>
								{pendingTasks.length ? (
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
									</List>
								) : null}

								<VirtualizedDBTaskList
									groupedTasks={groupedTasks}
									onTaskClick={(task) => {
										setTask(task);
									}}
								/>
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

					<Box>
						<Divider />
						<Stack
							alignItems="center"
							justifyContent="start"
							direction="row"
							padding={2}
							gap={1}
						>
							<Tooltip title="Clear history">
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

							<Tooltip title="Export tasks (soon)">
								<Box>
									<IconButton disabled>
										<FileUploadRoundedIcon />
									</IconButton>
								</Box>
							</Tooltip>

							<Tooltip title="Import tasks (soon)">
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
			<AllTasksModal
				open={Boolean(allTasks)}
				handleClose={handleCloseAllTasksModal}
			/>
		</>
	);
};

export default TaskList;
