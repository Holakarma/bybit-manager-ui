import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useGetGroupsQuery } from 'entities/group';
import useFilter from '../model/filterStore';

const GroupSelect = ({ ...props }) => {
	const { data: availableGroups, isLoading, isError } = useGetGroupsQuery();

	const setGroups = useFilter.use.setGroups();
	const groups = useFilter.use.groups();

	return (
		<Autocomplete
			{...props}
			multiple
			onChange={(_e, value) => {
				// @FIXME: убрать возможность выбора дубликатов
				setGroups(value.map((group) => group.group));
			}}
			disablePortal
			value={groups.map((group) => ({ group })) || []}
			options={availableGroups || []}
			fullWidth
			size="small"
			disabled={isError}
			loading={isLoading}
			getOptionLabel={(option) => option.group || 'No group'}
			noOptionsText="No groups"
			renderInput={(params) => (
				<TextField
					{...params}
					label={isError ? 'Some error occured' : 'Groups'}
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
