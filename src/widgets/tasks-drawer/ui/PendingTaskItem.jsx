import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded';
import {
	Button,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { formatSeconds, formatTime } from 'shared/lib/formatDate';
import { CircularProgressWithLabel } from 'shared/ui/circular-progress-with-label';
import taskTitle from '../model/taskTitles';

const calculateElapsedTime = (startedAt) => {
	const nowDatw = new Date();
	const startedAtData = new Date(startedAt);
	return Math.floor((nowDatw - startedAtData) / 1000);
};

const PendingTaskItem = ({ onClick, task }) => {
	const [contextMenu, setContextMenu] = useState(null);
	const [elapsedTime, setElapsedTime] = useState(
		calculateElapsedTime(task.startedAt),
	);

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
	const handleAbort = async () => {
		task.abort();
		handleClose();
	};

	/* Effects */
	useEffect(() => {
		const intervalId = setInterval(() => {
			setElapsedTime(calculateElapsedTime(task.startedAt));
		}, 1000);

		return () => clearInterval(intervalId);
	}, [task.startedAt]);

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
						{formatTime(new Date(task.startedAt))}{' '}
						{formatSeconds(elapsedTime)}
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

					<Typography
						variant="caption"
						color="warning"
					>
						{`${task.accounts.processed.length}/${task.accounts.toProcess.length}`}
					</Typography>

					<CircularProgressWithLabel
						color="warning"
						value={
							(task.accounts.processed.length * 100) /
							task.accounts.toProcess.length
						}
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
				<MenuItem onClick={handleAbort}>
					<ListItemIcon>
						<CancelScheduleSendRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Abort</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default PendingTaskItem;
