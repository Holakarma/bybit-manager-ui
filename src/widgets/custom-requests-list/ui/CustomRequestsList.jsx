import { CircularProgress, List, Stack, Typography } from '@mui/material';
import { useCustomRequests } from 'entities/custom-request';
import CreateRequestButton from './CreateRequestButton';
import CustomRequestItem from './CustomRequestItem';

const CustomRequestsList = ({ ...props }) => {
	const { data: requests, isError, isLoading } = useCustomRequests();

	if (isLoading) {
		return (
			<Stack
				gap={2}
				justifyContent="center"
				alignItems="center"
				sx={{ height: '100%' }}
				{...props}
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (isError) {
		return (
			<Stack
				gap={2}
				justifyContent="center"
				alignItems="center"
				sx={{ height: '100%' }}
				{...props}
			>
				<Typography
					variant="H5"
					color="error"
				>
					Error
				</Typography>
			</Stack>
		);
	}

	return (
		<Stack
			gap={2}
			{...props}
		>
			<Typography variant="H5">Your requests</Typography>

			{!requests.length && (
				<Typography
					textAlign="center"
					variant="Body"
					color="textSecondary"
				>
					Empty for now
				</Typography>
			)}

			{requests.length ? <CreateRequestButton /> : null}

			<List>
				{requests.map((request, i) => (
					<CustomRequestItem
						key={i}
						request={request}
					/>
				))}
			</List>
		</Stack>
	);
};

export default CustomRequestsList;
