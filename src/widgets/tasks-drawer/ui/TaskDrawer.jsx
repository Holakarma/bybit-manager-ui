import { Badge, Button, Drawer } from '@mui/material';
import { usePendingTasks } from 'entities/task';
import { useState } from 'react';
import { ListsIcon } from 'shared/assets/icons/lists';
import TaskList from './TaskList';

const TaskDrawer = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const pendingTasks = usePendingTasks.use.tasks();

	return (
		<>
			<Button
				onClick={toggleDrawer(true)}
				variant="contained"
				color="secondary"
			>
				<Badge
					badgeContent={pendingTasks.length}
					color="primary"
				>
					<ListsIcon />
				</Badge>
			</Button>
			<Drawer
				open={open}
				onClose={toggleDrawer(false)}
				anchor={'right'}
				elevation={0}
			>
				<TaskList />
			</Drawer>
		</>
	);
};

export default TaskDrawer;
