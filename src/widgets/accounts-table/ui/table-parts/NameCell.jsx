import { Stack, Typography } from '@mui/material';
import { ToggleNameContext } from 'entities/account';
import { useContext } from 'react';

const NameCell = ({ params }) => {
	const [toggleName] = useContext(ToggleNameContext);

	return toggleName && params.row.name ? (
		params.row.name
	) : (
		<Stack
			height="100%"
			justifyContent="center"
		>
			<Typography color="textSecondary">{params.row.id}</Typography>
		</Stack>
	);
};

export default NameCell;
