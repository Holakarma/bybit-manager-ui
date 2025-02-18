import { Button, Drawer } from '@mui/material';
import { useState } from 'react';
import { ListsIcon } from 'shared/assets/icons/lists';
import TaskList from './TaskList';

const TaskDrawer = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	return (
		<>
			<Button
				onClick={toggleDrawer(true)}
				variant="contained"
				color="secondary"
			>
				<ListsIcon />
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
