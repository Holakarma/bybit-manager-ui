import { TextField } from '@mui/material';
import useFilter from '../model/filterStore';

const Search = () => {
	const setSearch = useFilter.use.setSearch();
	const defaultValue = useFilter.use.search();

	return (
		<TextField
			label="Search accounts"
			variant="outlined"
			fullWidth
			size="small"
			onInput={(e) => setSearch(e.target.value)}
			defaultValue={defaultValue}
		/>
	);
};
export default Search;
