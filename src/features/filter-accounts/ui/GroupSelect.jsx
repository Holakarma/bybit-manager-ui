import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useGetGroupsQuery } from 'entities/group';
import useFilter from '../model/filterStore';

const GroupSelect = ({ ...props }) => {
	const { data: availableGroups, isLoading, error } = useGetGroupsQuery();

	const setGroups = useFilter.use.setGroups();
	const groups = useFilter.use.groups();

	return (
		<Autocomplete
			{...props}
			multiple
			onChange={(_e, value) =>
				setGroups(value.map((group) => group.group))
			}
			disablePortal
			value={groups.map((group) => ({ group })) || []}
			options={availableGroups || []}
			fullWidth
			size="small"
			disabled={error}
			color="error"
			loading={isLoading}
			getOptionLabel={(option) => option.group || 'No group'}
			noOptionsText="No groups"
			renderInput={(params) => (
				<TextField
					{...params}
					label={error ? 'Error' : 'Groups'}
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
