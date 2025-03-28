import { Stack } from '@mui/material';
import { Tag } from 'shared/ui/tag';

const MarkList = ({ marks }) => {
	return (
		<Stack
			direction="row"
			gap={1}
			alignItems="center"
			maxHeight="100%"
			paddingBlock={2}
		>
			{marks.map((mark, i) => (
				<Tag
					key={i}
					status={mark.status}
					textTransform="uppercase"
				>
					{mark.name}
				</Tag>
			))}
		</Stack>
	);
};

export default MarkList;
