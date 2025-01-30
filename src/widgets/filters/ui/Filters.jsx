import { Grid2, Stack } from '@mui/material';
import { ActionButton, LoginButton } from 'features/actions';
import { GroupSelect, SearchByEmail } from 'features/filter-accounts';

const Filters = () => {
	return (
		<Grid2
			container
			columns={4}
			spacing={2}
			maxWidth="750px"
		>
			<Grid2 size={1}>
				<GroupSelect />
			</Grid2>
			<Grid2 size={3}>
				<SearchByEmail />
			</Grid2>

			<Grid2 size={1}>
				<LoginButton />
			</Grid2>
			<Grid2 size={1}>
				<Stack
					direction="row"
					gap={2}
				>
					<ActionButton>Act</ActionButton>
					<ActionButton>Act</ActionButton>
					<ActionButton>Act</ActionButton>
				</Stack>
			</Grid2>
		</Grid2>
	);
};

export default Filters;
