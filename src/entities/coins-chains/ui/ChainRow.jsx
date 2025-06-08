import { Avatar, Stack, Typography } from '@mui/material';

const ChainRow = (props) => {
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
			alignItems="center"
			gap={2}
		>
			<Avatar
				alt={dataSet[1].name}
				src={dataSet[1].icon_night}
			/>

			<Stack>
				<Typography>
					{dataSet[1].name} ({dataSet[1].full_name})
				</Typography>

				<Typography color="textSecondary">
					Deposit completion: {dataSet[1].block_confirm_number}
				</Typography>
				<Typography color="textSecondary">
					Min. deposit: {dataSet[1].min_deposit}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default ChainRow;
