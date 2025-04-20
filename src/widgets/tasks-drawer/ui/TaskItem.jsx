import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {
	Box,
	Button,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Skeleton,
	Stack,
	Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useAccounts } from 'entities/account';
import { groupedLogs } from 'entities/log';
import { color, taskDB, taskTitle } from 'entities/task';
import { useMemo, useState } from 'react';
import { formatTime } from 'shared/lib/formatDate';

const TaskItem = ({ onClick, task }) => {
	const [contextMenu, setContextMenu] = useState(null);
	const queryClient = useQueryClient();

	const grouped = useMemo(() => {
		if (task) {
			return groupedLogs(task.logs);
		}
	}, [task]);

	const {
		data: accounts,
		isLoading,
		isError,
	} = useAccounts({ database_ids: Object.keys(grouped) });

	const groups = useMemo(() => {
		if (accounts) {
			const groupsObj = accounts.reduce((acc, account) => {
				if (account.group_name) {
					acc[account.group_name] = acc[account.group_name] || [];
					acc[account.group_name].push(account);
				}
				return acc;
			}, {});

			const groupsArray = Object.keys(groupsObj);

			if (groupsArray.length > 4) {
				return groupsArray.slice(0, 4).join(', ') + '...';
			}

			return groupsArray.join(', ');
		}

		return '';
	}, [accounts]);

	if (isLoading) {
		return (
			<Skeleton
				variant="rounded"
				width="100%"
				height="58px"
			/>
		);
	}

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
					gap={2}
					alignItems="baseline"
					justifyContent="space-between"
					width="100%"
				>
					<Typography>{taskTitle[task.type]}</Typography>

					<Box
						sx={{ flexGrow: 1 }}
						textAlign="start"
					>
						<Typography
							color="textSecondary"
							variant="caption"
						>
							{isError ? '' : groups}
						</Typography>
					</Box>

					<Typography
						color="textSecondary"
						variant="caption"
					>
						{formatTime(new Date(task.timestamp))}
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
