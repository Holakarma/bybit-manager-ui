import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import useFilter from '../../model/filterStore';
import FilterMenu from './FilterMenu';

const Search = () => {
	const setSearch = useFilter.use.setSearch();
	const defaultValue = useFilter.use.search();

	const [anchorEl, setAnchorEl] = useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<TextField
				label="Search accounts"
				variant="outlined"
				fullWidth
				size="small"
				onInput={(e) => setSearch(e.target.value)}
				defaultValue={defaultValue}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleClick}>
									<TuneRoundedIcon />
								</IconButton>
							</InputAdornment>
						),
					},
				}}
			/>

			<FilterMenu
				anchorEl={anchorEl}
				handleClose={handleClose}
			/>
		</>
	);
};
export default Search;
