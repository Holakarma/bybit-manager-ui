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
import { formatDate } from 'shared/lib/formatDate';
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

	return (
		<>
			<Button
				variant="outlined"
				color="secondary"
				fullWidth
				onClick={onClick}
				sx={{ justifyContent: 'space-between', height: '58px' }}
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
						{formatDate(new Date(task.timestamp))}
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

					<Pulsing
						color={`${color[task.status]}.main`}
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
				<MenuItem onClick={handleDelete}>
					<ListItemIcon>
						<DeleteForeverRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Delete</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default TaskItem;
