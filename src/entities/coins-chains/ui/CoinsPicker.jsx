import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const CoinsPicker = ({
	loading,
	startAdornment,
	listboxComponent,
	renderRow,
	slotProps,
	label,
	itemSize,
	...props
}) => {
	return (
		<Autocomplete
			disablePortal
			size="small"
			fullWidth
			loading={loading}
			disableClearable
			renderOption={(props, option, state) => [
				props,
				option,
				state.index,
			]}
			slotProps={{
				listbox: {
					component: listboxComponent,
					renderRow,
					itemSize,
					...slotProps?.listbox,
				},
				...slotProps,
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label || 'Coin'}
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
							startAdornment: (
								<>
									{startAdornment || null}
									{params.InputProps.startAdornment}
								</>
							),
						},
					}}
				/>
			)}
			{...props}
		/>
	);
};

export default CoinsPicker;
