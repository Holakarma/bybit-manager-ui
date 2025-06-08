import { Avatar, Stack, Typography } from '@mui/material';

const CoinRow = (props) => {
	const { data, index, style, LISTBOX_PADDING = 8 } = props;
	const dataSet = data[index];

	const inlineStyle = {
		...style,
		top: style.top + LISTBOX_PADDING,
	};

	const { key: _, ...optionProps } = dataSet[0];

	return (
		<Stack
			component="li"
			{...optionProps}
			style={inlineStyle}
			direction="row"
			gap={2}
		>
			<Avatar
				alt={dataSet[1].symbol}
				src={dataSet[1].icon_night}
			/>
			{dataSet[1].symbol}

			<Typography color="textSecondary">
				{dataSet[1].full_name}
			</Typography>
		</Stack>
	);
};

export default CoinRow;
