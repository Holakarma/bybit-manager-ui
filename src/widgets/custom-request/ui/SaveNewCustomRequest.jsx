import { Button } from '@mui/material';
import { useAddCustomRequest } from 'entities/custom-request';

const SaveNewCustomRequest = ({ newCustomRequest }) => {
	const mutation = useAddCustomRequest();
	return (
		<Button
			variant="contained"
			sx={{ minWidth: '100px' }}
			disabled={!newCustomRequest.path || !newCustomRequest.title}
			onClick={() => mutation.mutate(newCustomRequest)}
			loading={mutation.isPending}
		>
			Save
		</Button>
	);
};

export default SaveNewCustomRequest;
