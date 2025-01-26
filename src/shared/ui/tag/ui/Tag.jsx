import { Box, Typography, useTheme } from '@mui/material';
import css from './Tag.module.scss';

const Tag = ({
	children,
	status = 'success',
	className = '',
	sx,
	...props
}) => {
	const theme = useTheme();

	const styles = (status) => {
		switch (status) {
			case 'success':
				return {
					color: theme.palette.success.main,
					backgroundColor: `${theme.palette.success.main}14`,
				};
			case 'error':
				return {
					color: theme.palette.error.main,
					backgroundColor: `${theme.palette.error.main}14`,
				};
			case 'info':
				return {
					color: theme.palette.info.main,
					backgroundColor: `${theme.palette.info.main}14`,
				};
			case 'warning':
				return {
					color: theme.palette.warning.main,
					backgroundColor: `${theme.palette.warning.main}14`,
				};
		}
	};

	return (
		<Box
			{...props}
			className={`${className} ${css['Tag']}`}
			sx={{ ...styles(status), ...sx }}
		>
			<Typography variant="body">{children}</Typography>
		</Box>
	);
};

export default Tag;
