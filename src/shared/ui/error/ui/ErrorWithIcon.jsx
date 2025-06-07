import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Stack, Typography } from '@mui/material';

const ErrorWithIcon = ({
	icon,
	description,
	action,
	children,
	slotProps,
	...props
}) => {
	return (
		<Stack
			height="100%"
			justifyContent="center"
			alignItems="center"
			color="textSecondary.default"
			{...props}
		>
			{icon || (
				<WarningRoundedIcon
					sx={{
						width: '200px',
						height: '200px',
						fill: 'currentColor',
					}}
				/>
			)}
			{children || (
				<Typography
					variant="h6"
					textAlign="center"
					{...slotProps?.typography}
				>
					{description || 'Some error occured'}
				</Typography>
			)}
			{action}
		</Stack>
	);
};

export default ErrorWithIcon;
