import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const ChainPicker = ({ loading, ...props }) => {
	return (
		<Autocomplete
			{...props}
			isOptionEqualToValue={(option, value) =>
				option.chain_full_name === value.chain_full_name
			}
			disablePortal
			size="small"
			fullWidth
			loading={loading}
			getOptionLabel={(option) => option.chain_full_name}
			disableClearable
			renderInput={(params) => (
				<TextField
					{...params}
					label="Chain type"
					slotProps={{
						input: {
							...params.InputProps,
							endAdornment: (
								<>
									{loading ? (
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
			slotProps={{
				listbox: {
					sx: {
						maxHeight: '250px',
					},
				},
			}}
		/>
	);
};

export default ChainPicker;
