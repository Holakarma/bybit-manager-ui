import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Chip,
	Divider,
	FormControl,
	FormControlLabel,
	InputLabel,
	ListItem,
	Menu,
	MenuItem,
	Select,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { useKycCountries, useLastLoginCountry } from 'entities/filter';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumberField } from 'shared/ui/number-field';
import useFilter from '../model/filterStore';
import { defaultValues, schema } from '../model/schema';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: 250,
			width: 250,
		},
	},
};

const FilterMenu = ({ anchorEl, handleClose }) => {
	const open = Boolean(anchorEl);
	const { data: kycCountries, isLoading: isKycCountriesLoading } =
		useKycCountries();
	const { data: lastLoginCountries, isLoading: isLastLoginCountriesLoading } =
		useLastLoginCountry();
	const setFilter = useFilter.use.setFilter();
	const filter = useFilter.use.filter();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
		trigger,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues,
		mode: 'onChange',
	});

	useEffect(() => {
		reset(filter);
	}, [filter, reset]);

	const onSubmit = (data) => {
		setFilter(data);
		handleClose();
	};

	const onReset = () => {
		reset(defaultValues);
	};

	return (
		<Menu
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
			slotProps={{
				paper: {
					style: {
						width: '450px',
					},
				},
			}}
		>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ListItem>
					<Controller
						name="only_with_secure_token"
						control={control}
						render={({ field }) => (
							<FormControlLabel
								labelPlacement="start"
								control={
									<Switch
										{...field}
										checked={field.value}
									/>
								}
								label="Only with secure token"
							/>
						)}
					/>
				</ListItem>

				<ListItem>
					<Controller
						name="kyc_levels"
						control={control}
						render={({ field }) => (
							<FormControl
								variant="standard"
								fullWidth
								size="small"
							>
								<InputLabel id="kyc-level-filter-label">
									KYC level
								</InputLabel>
								<Select
									{...field}
									multiple
									labelId="kyc-level-filter-label"
									label="KYC level"
									MenuProps={MenuProps}
									renderValue={(selected) => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5,
											}}
										>
											{selected.map((value) => (
												<Chip
													key={value}
													label={
														value === null
															? 'Unknown'
															: value
													}
												/>
											))}
										</Box>
									)}
								>
									<MenuItem value={null}>Unknown</MenuItem>
									<MenuItem value={0}>0</MenuItem>
									<MenuItem value={1}>1</MenuItem>
									<MenuItem value={2}>2</MenuItem>
								</Select>
							</FormControl>
						)}
					/>
				</ListItem>

				<ListItem>
					<Controller
						name="kyc_countries"
						control={control}
						render={({ field }) => (
							<FormControl
								variant="standard"
								fullWidth
								size="small"
							>
								<InputLabel id="kyc-country-filter-label">
									KYC county
								</InputLabel>
								<Select
									{...field}
									multiple
									labelId="kyc-country-filter-label"
									label="KYC county"
									disabled={isKycCountriesLoading}
									renderValue={(selected) => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5,
											}}
										>
											{selected.map((value) => (
												<Chip
													key={value}
													label={value || 'No KYC'}
												/>
											))}
										</Box>
									)}
									MenuProps={MenuProps}
								>
									{kycCountries?.length ? (
										kycCountries.map((country) => (
											<MenuItem
												key={country.country}
												value={country.country || ''}
											>
												<Stack
													flexDirection="row"
													justifyContent="space-between"
													gap={2}
													width="100%"
												>
													{country.country ||
														'No KYC'}
													<Typography
														variant="caption"
														color="textSecondary"
														style={{ marginTop: 2 }}
													>
														{country.account_count}
													</Typography>
												</Stack>
											</MenuItem>
										))
									) : (
										<MenuItem disabled>
											No KYC countries
										</MenuItem>
									)}
								</Select>
							</FormControl>
						)}
					/>
				</ListItem>

				<ListItem>
					<Controller
						name="last_login_countries"
						control={control}
						render={({ field }) => (
							<FormControl
								variant="standard"
								fullWidth
								size="small"
							>
								<InputLabel id="last-login-country-filter-label">
									Last login county
								</InputLabel>
								<Select
									{...field}
									multiple
									labelId="last-login-country-filter-label"
									label="Last login county"
									disabled={isLastLoginCountriesLoading}
									renderValue={(selected) => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5,
											}}
										>
											{selected.map((value) => (
												<Chip
													key={value}
													label={
														value ||
														'No latst login'
													}
												/>
											))}
										</Box>
									)}
									MenuProps={MenuProps}
								>
									{lastLoginCountries?.length ? (
										lastLoginCountries.map((country) => (
											<MenuItem
												key={country.country}
												value={country.country || ''}
											>
												<Stack
													flexDirection="row"
													justifyContent="space-between"
													gap={2}
													width="100%"
												>
													{country.country ||
														'No last login'}
													<Typography
														variant="caption"
														color="textSecondary"
														style={{ marginTop: 2 }}
													>
														{country.account_count}
													</Typography>
												</Stack>
											</MenuItem>
										))
									) : (
										<MenuItem disabled>
											No countries
										</MenuItem>
									)}
								</Select>
							</FormControl>
						)}
					/>
				</ListItem>

				<ListItem>
					<Controller
						name="kyc_providers"
						control={control}
						render={({ field }) => (
							<FormControl
								variant="standard"
								fullWidth
								size="small"
							>
								<InputLabel id="kyc-providers-filter-label">
									KYC providers
								</InputLabel>
								<Select
									{...field}
									multiple
									labelId="kyc-providers-filter-label"
									label="KYC providers"
									renderValue={(selected) => (
										<Box
											sx={{
												display: 'flex',
												flexWrap: 'wrap',
												gap: 0.5,
											}}
										>
											{selected.map((value) => (
												<Chip
													key={value}
													label={
														value === ''
															? 'Unknown'
															: value
													}
												/>
											))}
										</Box>
									)}
								>
									<MenuItem value={''}>Unknown</MenuItem>
									<MenuItem value={'PROVIDER_SUMSUB'}>
										Sumsub
									</MenuItem>
									<MenuItem value={'PROVIDER_ONFIDO'}>
										Onfido
									</MenuItem>
								</Select>
							</FormControl>
						)}
					/>
				</ListItem>

				<ListItem>
					<Stack
						direction="row"
						minHeight="65px"
					>
						<Controller
							name="min_balance"
							control={control}
							render={({ field }) => (
								<NumberField
									unit="$"
									{...field}
									onChange={(e) => {
										field.onChange(
											Number(e.target.value) || 0,
										);
										trigger(`max_balance`);
									}}
									type={'text'}
									error={!!errors.min_balance}
									helperText={errors.min_balance?.message}
								/>
							)}
						/>
						-
						<Controller
							name="max_balance"
							control={control}
							render={({ field }) => (
								<NumberField
									{...field}
									onChange={(e) => {
										const value = e.target.value.trim();
										field.onChange(
											value === '' ? null : Number(value),
										);
									}}
									onBlur={() => {
										if (field.value === '') {
											field.onChange(null);
										}
									}}
									value={
										field.value === null ? '' : field.value
									}
									unit="$"
									error={!!errors.max_balance}
									helperText={errors.max_balance?.message}
								/>
							)}
						/>
					</Stack>
				</ListItem>

				<Divider />

				<ListItem>
					<Button
						type="submit"
						disabled={Boolean(Object.keys(errors).length)}
					>
						Apply
					</Button>
					<Button onClick={onReset}>Reset</Button>
				</ListItem>
			</form>
		</Menu>
	);
};

export default FilterMenu;
