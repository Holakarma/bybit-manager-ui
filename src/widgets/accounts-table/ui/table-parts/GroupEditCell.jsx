import { Autocomplete, InputBase } from '@mui/material';
import { useGridApiContext } from '@mui/x-data-grid';
import { useGetGroupsQuery } from 'entities/group';

const GroupEditCell = ({ params }) => {
	const { data: groups, isLoading, isError } = useGetGroupsQuery();
	const { id, field, value } = params;

	const apiRef = useGridApiContext();

	const handleValueChange = (_event, value) => {
		apiRef.current.setEditCellValue({ id, field, value });
	};

	return (
		<Autocomplete
			freeSolo
			options={
				!isError && groups
					? groups?.map((group) => group.group).filter(Boolean)
					: []
			}
			fullWidth
			onChange={handleValueChange}
			loading={isLoading}
			value={value}
			renderInput={(params) => (
				<InputBase
					autoFocus
					inputProps={{ ...params.inputProps }}
					ref={params.InputProps.ref}
					sx={{ paddingInline: 2 }}
				/>
			)}
		/>
	);
};

export default GroupEditCell;
