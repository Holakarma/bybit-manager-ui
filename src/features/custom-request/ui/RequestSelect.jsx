import {
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from '@mui/material';
import { useCustomRequests } from 'entities/custom-request';
import { Link } from 'react-router';
import ROUTES from 'shared/config/routes';

const RequestSelect = ({ onRequestChange, requestId, ...props }) => {
	const { data: customRequests, isLoading, isError } = useCustomRequests();

	if (isLoading) {
		return (
			<Stack
				{...props}
				gap={2}
				padding={2}
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (isError) {
		return (
			<Stack
				{...props}
				gap={2}
				padding={2}
				justifyContent="center"
				alignItems="center"
			>
				<Typography
					variant="H5"
					color="error"
				>
					IndexedDB error
				</Typography>
			</Stack>
		);
	}

	return (
		<FormControl
			{...props}
			fullWidth
		>
			<InputLabel id="request-select-label">Choose request</InputLabel>
			<Select
				labelId="request-select-label"
				label="Choose request"
				value={requestId}
				onChange={(e) => onRequestChange(e.target.value)}
			>
				{customRequests.map((request) => (
					<MenuItem
						value={request.id}
						key={request.id}
					>
						<Stack
							direction="row"
							gap={1}
							alignItems="baseline"
							maxWidth={'600px'}
						>
							<Typography
								sx={{
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									flexGrow: 1,
								}}
								variant="body"
							>
								{request.title}
							</Typography>
							<Typography
								sx={{
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									flexGrow: 1,
								}}
								variant="caption"
								color="textSecondary"
							>
								{request.path}
							</Typography>
						</Stack>
					</MenuItem>
				))}
				<Box
					paddingInline={2}
					paddingBlock={1}
				>
					<Link
						to={ROUTES.REQUESTS}
						target="_blank"
					>
						<Typography color="textSecondary">
							Create new request
						</Typography>
					</Link>
				</Box>
			</Select>
		</FormControl>
	);
};

export default RequestSelect;
