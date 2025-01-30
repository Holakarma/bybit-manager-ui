import { TextField } from '@mui/material';
import { useFilter } from '..';

const SearchByEmail = () => {
	const setEmail = useFilter.use.setEmail();

	return (
		<TextField
			label="Search by address"
			variant="outlined"
			fullWidth
			size="small"
			onInput={(e) => setEmail(e.target.value)}
		/>
	);
};
export default SearchByEmail;
