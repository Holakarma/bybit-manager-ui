import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ControlPointDuplicateRoundedIcon from '@mui/icons-material/ControlPointDuplicateRounded';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import {
	IconButton,
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
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { stringifyCurl } from 'shared/lib/curl-parser';
import { uniqueId } from 'shared/lib/generateUniqueId';

const CustomRequestItem = ({ request }) => {
	const setRequest = useSelectedRequest.use.setRequest();
	const selected = useSelectedRequest.use.request();

	const unsetRequest = useSelectedRequest.use.unsetRequest();
	const mutation = useDeleteCustomRequest();

	const handleDelete = () => {
		mutation.mutate(request.id);

		if (selected?.id === request.id) {
			unsetRequest();
		}
		handleClose();
	};

	const { enqueueSnackbar } = useSnackbar();
	const handleCopy = () => {
		try {
			navigator.clipboard.writeText(stringifyCurl(request));
			enqueueSnackbar('Copied to clipboard', {
				variant: 'info',
			});
		} catch (e) {
			enqueueSnackbar(`Did not copied to clipboard: ${e.message}`, {
				variant: 'error',
			});
		}

		handleClose();
	};

	const handleDuplicate = () => {
		setRequest({
			...request,
			id: uniqueId(),
			title: request.title + ' (copy)',
		});
		handleClose();
	};

	/* Menu */
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<ListItem disablePadding>
				<Tooltip
					title={request.path}
					disableInteractive
				>
					<ListItemButton
						selected={request.id === selected?.id}
						onClick={() => {
							setRequest(request);
						}}
						disableRipple
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

							<IconButton
								size="small"
								onClick={(e) => {
									e.stopPropagation();
									handleClick(e);
								}}
							>
								<MoreVertOutlinedIcon />
							</IconButton>
						</Stack>
					</ListItemButton>
				</Tooltip>
			</ListItem>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleCopy}>
					<ListItemIcon size="small">
						<ContentCopyRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Copy as curl(bash)</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleDuplicate}>
					<ListItemIcon size="small">
						<ControlPointDuplicateRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Duplicate</ListItemText>
				</MenuItem>
				<MenuItem onClick={handleDelete}>
					<ListItemIcon size="small">
						<DeleteRoundedIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>Delete</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomRequestItem;
