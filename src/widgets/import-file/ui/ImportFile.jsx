import { Button, Stack, Typography, useTheme } from '@mui/material';
import { VisuallyHiddenInput } from 'shared/ui/visually-hidden-input';

const ImportFile = ({ ...props }) => {
	const { palette } = useTheme();
	return (
		<Stack
			{...props}
			alignItems="end"
			gap={1}
		>
			<Stack
				width="100%"
				alignItems="center"
				justifyContent="center"
				p={5}
				border={`4px dashed ${palette.secondary.main}`}
				borderRadius={3}
			>
				<Stack alignItems="center">
					<Typography variant="BodyM">
						Drop the .xlsx file here or
					</Typography>
					<Button
						component="label"
						variant="unstyled"
						sx={{ '&:hover': { opacity: 0.8 } }}
						color={palette.textPrimary.default}
					>
						<Typography
							variant="BodyM"
							sx={{ textDecoration: 'underline' }}
						>
							Pick one
						</Typography>
						<VisuallyHiddenInput
							type="file"
							onChange={(event) =>
								console.log(event.target.files)
							}
						/>
					</Button>
				</Stack>
			</Stack>
			<Button
				variant="unstyled"
				sx={{ '&:hover': { opacity: 0.8 } }}
				color={palette.textPrimary.default}
			>
				<Typography
					variant="Caption"
					sx={{ textDecoration: 'underline' }}
				>
					Download the template file
				</Typography>
			</Button>
		</Stack>
	);
};

export default ImportFile;
