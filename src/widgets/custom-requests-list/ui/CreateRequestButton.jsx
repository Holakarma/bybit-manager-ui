import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { ListItem, ListItemButton, Stack } from '@mui/material';
import { useSelectedRequest } from 'entities/custom-request';

const CreateRequestButton = () => {
	const unsetRequest = useSelectedRequest.use.unsetRequest();
	const request = useSelectedRequest.use.request();
	return (
		<ListItem disablePadding>
			<ListItemButton
				disabled={!request}
				onClick={() => {
					unsetRequest();
				}}
			>
				<Stack
					width="100%"
					gap={1}
					direction="row"
					alignItems="center"
					justifyContent="center"
				>
					<AddCircleRoundedIcon />
					{/* <Typography textAlign="center">Add new request</Typography> */}
				</Stack>
			</ListItemButton>
		</ListItem>
	);
};

export default CreateRequestButton;
