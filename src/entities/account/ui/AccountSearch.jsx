import { TextField } from '@mui/material';
import useSearch from '../lib/filterStore';

const AcountSearch = () => {
	const setEmail = useSearch((state) => state.setEmail);

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
