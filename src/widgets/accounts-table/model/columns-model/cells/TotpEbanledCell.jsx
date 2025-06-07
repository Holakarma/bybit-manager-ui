import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import { Stack } from '@mui/material';

const ICONS = {
	[true]: (
		<CheckRoundedIcon
			fontSize="small"
			color="success"
		/>
	),
	[false]: (
		<CloseRoundedIcon
			fontSize="small"
			color="error"
		/>
	),
	[null]: (
		<QuestionMarkRoundedIcon
			fontSize="small"
			color="warning"
		/>
	),
};

const TotpEnabledCell = ({ params }) => {
	const value = params.formattedValue;

	return (
		<Stack
			width="100%"
			height="100%"
			direction="row"
			justifyContent="center"
			alignItems="center"
			gap={2}
		>
			{ICONS[value]}
		</Stack>
	);
};

export default TotpEnabledCell;
