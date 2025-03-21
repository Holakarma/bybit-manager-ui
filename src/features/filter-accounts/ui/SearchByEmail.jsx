import { TextField } from '@mui/material';
import { useFilter } from '..';

const SearchByEmail = () => {
	const setSearch = useFilter.use.setSearch();

	return (
		<TextField
			label="Search by address"
			variant="outlined"
			fullWidth
			size="small"
			onInput={(e) => setSearch(e.target.value)}
		/>
	);
};
export default SearchByEmail;
