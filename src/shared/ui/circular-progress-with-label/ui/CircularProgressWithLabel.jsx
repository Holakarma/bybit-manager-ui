import { Box, CircularProgress, Typography } from '@mui/material';

const CircularProgressWithLabel = (props) => {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex' }}>
			<CircularProgress
				variant="determinate"
				{...props}
			/>
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography
					variant="caption"
					component="div"
					sx={{ color: 'text.secondary' }}
				>
					{props.label || `${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
};

export default CircularProgressWithLabel;
