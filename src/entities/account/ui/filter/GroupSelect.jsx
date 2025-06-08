import {
	Autocomplete,
	CircularProgress,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useGetGroupsQuery } from 'entities/group';
import { useMemo } from 'react';
import { usd } from 'shared/lib/balance-visualize';
import useFilter from '../../model/filterStore';

const GroupSelect = ({ ...props }) => {
	const { data: availableGroups, isLoading, isError } = useGetGroupsQuery();

	const setGroups = useFilter.use.setGroups();
	const groups = useFilter.use.groups();

	const filteredGroups = useMemo(() => {
		if (availableGroups) {
			return availableGroups.filter(
				(availableGroup) => !groups.includes(availableGroup.group),
			);
		}

		return [];
	}, [availableGroups, groups]);

	return (
		<Autocomplete
			{...props}
			multiple
			onChange={(_e, value) => {
				setGroups(value.map((group) => group.group));
			}}
			disablePortal
			value={groups.map((group) => ({ group })) || []}
			options={filteredGroups}
			fullWidth
			size="small"
			disabled={isError}
			loading={isLoading}
			getOptionLabel={(option) => option.group || 'No group'}
			noOptionsText="No groups"
			renderOption={(props, option) => {
				return (
					<li
						{...props}
						key={option.group}
					>
						<Stack
							flexDirection="row"
							justifyContent="space-between"
							gap={2}
							width="100%"
						>
							<Typography variant="body1">
								{option.group}
							</Typography>
							<Typography
								variant="caption"
								color="text.secondary"
								style={{ marginTop: 2 }}
							>
								{usd(option.balance_usd)}
							</Typography>
						</Stack>
					</li>
				);
			}}
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
