import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import {
	useDeleteCustomRequest,
	useSelectedRequest,
} from 'entities/custom-request';
import { useState } from 'react';

const CustomRequestItem = ({ request }) => {
	const setRequest = useSelectedRequest.use.setRequest();
	const selected = useSelectedRequest.use.request();

	const unsetRequest = useSelectedRequest.use.unsetRequest();
	const mutation = useDeleteCustomRequest();

	const [contextMenu, setContextMenu] = useState(null);
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
	const handleDelete = () => {
		mutation.mutate(request.id);

		if (selected?.id === request.id) {
			unsetRequest();
		}
		handleClose();
	};

	return (
		<>
			<ListItem
				disablePadding
				onContextMenu={handleContextMenu}
			>
				<Tooltip
					title={request.path}
					disableInteractive
				>
					<ListItemButton
						selected={request.id === selected?.id}
						onClick={() => {
							setRequest(request);
						}}
					>
						<Stack
							gap={1}
							direction="row"
							alignItems="center"
							sx={{
								width: '100%',
								whiteSpace: 'nowrap',
								overflow: 'hidden',
							}}
						>
							<Typography
								variant="caption"
								color="textSecondary"
								minWidth="50px"
							>
								{request.method}
							</Typography>
							<Typography
								sx={{
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									flexGrow: 1,
								}}
							>
								{request.title}
							</Typography>
						</Stack>
					</ListItemButton>
				</Tooltip>
			</ListItem>

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
						<DeleteRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Delete</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomRequestItem;
