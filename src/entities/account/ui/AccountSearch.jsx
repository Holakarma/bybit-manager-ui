import { TextField } from '@mui/material';
import useSearch from '../model/filterStore';

const AcountSearch = () => {
	const setEmail = useSearch.use.setEmail();

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
export default AcountSearch;
