import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {
	Button,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { color, taskDB } from 'entities/task';
import { useState } from 'react';
import { formatDate, formatTime } from 'shared/lib/formatDate';
import { Pulsing } from 'shared/ui/pulsing';
import taskTitle from '../model/taskTitles';

const TaskItem = ({ onClick, task }) => {
	const [contextMenu, setContextMenu] = useState(null);
	const queryClient = useQueryClient();

	const handleContextMenu = (event) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
					}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
					// Other native context menus might behave different.
					// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
					null,
		);
	};
	const handleClose = () => {
		setContextMenu(null);
	};
	const handleDelete = async () => {
		await taskDB.deleteTask(task.id);
		queryClient.invalidateQueries({ queryKey: ['tasks'] });
		handleClose();
	};
	const handleAbort = async () => {
		task.abort();
		handleClose();
	};

	return (
		<>
			<Button
				variant="outlined"
				color="secondary"
				fullWidth
				onClick={onClick}
				sx={{ justifyContent: 'space-between' }}
				onContextMenu={handleContextMenu}
				style={{ cursor: 'context-menu' }}
			>
				<Stack
					direction="row"
					gap={1}
					alignItems="baseline"
				>
					<Typography>{taskTitle[task.type]}</Typography>
					<Typography
						color="textSecondary"
						variant="caption"
					>
						{task.status
							? formatDate(new Date(task.timestamp))
							: formatTime(new Date(task.startedAt))}
					</Typography>
				</Stack>
				<Stack
					direction="row"
					gap={1}
					alignItems="center"
				>
					<Typography
						variant="caption"
						color={task.status ? color[task.status] : 'warning'}
					>
						{task.status || 'pending'}
					</Typography>

					<Pulsing
						color={
							task.status
								? `${color[task.status]}.main`
								: 'warning.main'
						}
						animate={!task.status}
					/>
				</Stack>
			</Button>

			<Menu
				open={contextMenu !== null}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu !== null
						? {
								top: contextMenu.mouseY,
								left: contextMenu.mouseX,
							}
						: undefined
				}
			>
				{task.status ? (
					<MenuItem onClick={handleDelete}>
						<ListItemIcon>
							<DeleteForeverRoundedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Delete</ListItemText>
					</MenuItem>
				) : (
					<MenuItem onClick={handleAbort}>
						<ListItemIcon>
							<CancelScheduleSendRoundedIcon fontSize="small" />
						</ListItemIcon>
						<ListItemText>Abort</ListItemText>
					</MenuItem>
				)}
			</Menu>
		</>
	);
};

export default TaskItem;
