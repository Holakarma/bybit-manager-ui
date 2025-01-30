import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useGetGroupsQuery } from 'entities/group';
import useFilter from '../model/filterStore';

const GroupSelect = ({ ...props }) => {
	const { data: groups, isLoading, error } = useGetGroupsQuery();
	const setGroup = useFilter.use.setGroup();

	return (
		<Autocomplete
			{...props}
			onChange={(_e, value) => setGroup(value?.group || '')}
			disablePortal
			options={groups || []}
			fullWidth
			size="small"
			disabled={error}
			color="error"
			loading={isLoading}
			getOptionLabel={(option) => option.group}
			noOptionsText="No groups"
			renderInput={(params) => (
				<TextField
					{...params}
					label={error ? 'Error' : 'Group'}
					slotProps={{
						input: {
							...params.InputProps,
							endAdornment: (
								<>
									{isLoading ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
								</>
							),
						},
					}}
				/>
			)}
		/>
	);
};

export default GroupSelect;
