import { Grid2 } from '@mui/material';
import { GroupSelect, Search } from 'features/filter-accounts';

const Filters = () => {
	return (
		<Grid2
			container
			columns={5}
			spacing={2}
			maxWidth="750px"
		>
			<Grid2 size={2}>
				<GroupSelect />
			</Grid2>
			<Grid2 size={3}>
				<Search />
			</Grid2>
		</Grid2>
	);
};

export default Filters;
