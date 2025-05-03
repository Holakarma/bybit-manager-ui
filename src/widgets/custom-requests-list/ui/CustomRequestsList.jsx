import { Box, CircularProgress, List, Stack, Typography } from '@mui/material';
import { useCustomRequests } from 'entities/custom-request';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
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

	const Row = ({ index, style }) => {
		const request = requests[index];
		return (
			<div style={style}>
				<CustomRequestItem request={request} />
			</div>
		);
	};

	return (
		<Stack
			gap={2}
			{...props}
			height="100%"
		>
			<Typography variant="H5">Your requests</Typography>

			{!requests.length && (
				<Typography
					variant="Body"
					color="textSecondary"
				>
					Empty for now
				</Typography>
			)}

			{requests.length ? <CreateRequestButton /> : null}

			<Box
				flexGrow={1}
				position="relative"
			>
				<List
					sx={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						overflow: 'auto',
					}}
				>
					<AutoSizer>
						{({ height, width }) => (
							<FixedSizeList
								height={height}
								width={width}
								itemCount={requests.length}
								itemSize={40}
								overscanCount={1}
							>
								{Row}
							</FixedSizeList>
						)}
					</AutoSizer>
				</List>
			</Box>
		</Stack>
	);
};

export default CustomRequestsList;
