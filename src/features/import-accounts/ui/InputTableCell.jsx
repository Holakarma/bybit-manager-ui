import { OutlinedInput, useTheme } from '@mui/material';

const InputTableCell = ({ inputProps, ...props }) => {
	const theme = useTheme();
	return (
		<OutlinedInput
			size="small"
			inputProps={{
				style: {
					fontFamily: theme.typography.Body.fontFamily,
					fontSize: theme.typography.Body.fontSize,
					fontWeight: theme.typography.Body.fontWeight,
					letterSpacing: theme.typography.Body.letterSpacing,
					lineHeight: theme.typography.Body.lineHeight,
				},
				...inputProps,
			}}
			sx={{
				'&::placeholder': {
					color: theme.palette.text.secondary,
					opacity: 1,
				},
				borderRadius: '8px',
				borderColor: theme.palette.secondary.main,
			}}
			fullWidth
			{...props}
		/>
	);
};

export default InputTableCell;
