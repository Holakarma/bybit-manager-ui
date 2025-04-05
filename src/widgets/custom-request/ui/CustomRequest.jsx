import {
	Box,
	Button,
	FormControlLabel,
	InputAdornment,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Stack,
	Tab,
	Table,
	TableBody,
	TableContainer,
	Tabs,
	TextField,
} from '@mui/material';
import {
	CustomRequestDTO,
	useAddCustomRequest,
	useSelectedRequest,
	useUpdateCustomRequest,
} from 'entities/custom-request';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { parseCurl } from 'shared/lib/curl-parser';
import { formatJson } from 'shared/lib/format-json';
import { uniqueId } from 'shared/lib/generateUniqueId';
import { isEmptyValues } from 'shared/lib/isEmptyValues';
import { exportParams } from 'shared/lib/param-parser';
import ParamRow from './ParamRow';
import RequestTitle from './RequestTitle';

// eslint-disable-next-line react/display-name
const MethodSelect = forwardRef(({ value, onChange, ...props }, ref) => (
	<Select
		ref={ref}
		value={value}
		onChange={onChange}
		sx={{
			minWidth: 100,
		}}
		variant="standard"
		disableUnderline
		{...props}
	>
		<MenuItem value="GET">GET</MenuItem>
		<MenuItem value="POST">POST</MenuItem>
		<MenuItem value="PATCH">PATCH</MenuItem>
		<MenuItem value="DELETE">DELETE</MenuItem>
	</Select>
));

const defaultCustomRequest = {
	method: 'GET',
	path: '',
	json: '{}',
	data: '',
	params: [{ key: '', value: '' }],
	bodyType: 'JSON',
	title: 'New request',
	id: uniqueId(),
};

const CustomRequest = ({ ...props }) => {
	const customRequest = useSelectedRequest.use.request();
	const setRequest = useSelectedRequest.use.setRequest();

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isDirty },
		setValue,
		trigger,
		reset,
		resetField,
		watch,
	} = useForm({
		defaultValues: customRequest || defaultCustomRequest,
		mode: 'onChange',
	});

	useEffect(() => {
		if (customRequest) {
			reset({
				...customRequest,
				json: formatJson(customRequest.json),
				params: [
					...exportParams(customRequest.params),
					{ key: '', value: '' },
				],
			});
		} else {
			reset(defaultCustomRequest);
		}
		return () => reset();
	}, [customRequest, reset]);

	const addMutatiom = useAddCustomRequest();
	const updateMutation = useUpdateCustomRequest();

	const onSubmit = (data) => {
		const newRequest = new CustomRequestDTO({
			...data,
			params: data.params.filter((p) => p.key && p.value),
		});

		if (customRequest) {
			updateMutation.mutate({
				id: newRequest.id,
				newCustomRequestData: newRequest,
			});
		} else {
			addMutatiom.mutate(newRequest);
		}
		setRequest(newRequest);
	};

	const handleParamChange = (index, newParam) => {
		const isLastParam = index === paramsFields.length - 1;

		// eslint-disable-next-line no-unused-vars
		const { id, ...withoutId } = newParam;
		const isEmpty = isEmptyValues(withoutId);

		if (isLastParam && !isEmpty) {
			append({ key: '', value: '' });
		}

		if (!isLastParam && isEmpty) {
			remove(index);
		}

		setValue(`params.${index}`, newParam);
		trigger(`params.${index}`);
	};

	const {
		fields: paramsFields,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'params',
	});

	const [tab, setTab] = useState(0);

	const handletabChange = (_event, newValue) => {
		setTab(newValue);
	};

	const bodyTypeWatch = watch('bodyType');

	const validateBody = useCallback(
		(value) => {
			if (bodyTypeWatch === 'JSON' && value.trim()) {
				try {
					JSON.parse(value);
					return true;
				} catch (_e) {
					return 'Invalid JSON format';
				}
			}
			return true;
		},
		[bodyTypeWatch],
	);

	const handleJsonBlur = async (e) => {
		const rawValue = e.target.value;

		try {
			const parsedJson = JSON.parse(rawValue.trim());

			const formattedJson = formatJson(parsedJson);

			setValue('json', formattedJson);

			await trigger('json');
		} catch (_error) {
			setValue('json', rawValue.trim());

			await trigger('json');
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();

		const curlCmd = e.clipboardData.getData('text');

		try {
			const parsedCurl = parseCurl(curlCmd);

			if (!parsedCurl.url) {
				setValue('path', curlCmd);
				return;
			}

			setValue('method', parsedCurl.method || 'GET');
			trigger('method');
			setValue('path', parsedCurl.url);
			trigger('path');

			const paramsArray = Object.entries(parsedCurl.params).map(
				([key, value]) => ({
					key,
					value,
				}),
			);

			remove();
			if (paramsArray.length > 0) {
				append([...paramsArray]);
			}
			append([{ key: '', value: '' }]);

			resetField('body');
			resetField('data');
			resetField('bodyType');
			// JSON
			if (parsedCurl.body) {
				setValue('bodyType', 'JSON');
				setValue('json', formatJson(parsedCurl.body));
			}

			// form-data / x-www-form-urlencoded
			if (parsedCurl.data) {
				setValue('bodyType', 'x-www-form-urlencoded');
				setValue('data', parsedCurl.data);
				trigger('bodyType');
			}
		} catch (error) {
			console.error('Failed to parse curl command:', error);
		}
	};

	return (
		<Stack
			{...props}
			gap={2}
			component={'form'}
			onSubmit={handleSubmit(onSubmit)}
			justifyContent={'space-between'}
		>
			<Stack gap={2}>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<RequestTitle
							title={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
				<Stack
					direction="row"
					gap={2}
					paddingTop={2}
				>
					<Controller
						name="path"
						control={control}
						rules={{
							required: 'Path is required',
						}}
						render={({ field }) => (
							<TextField
								{...field}
								label="Request"
								fullWidth
								onPaste={handlePaste}
								sx={{ height: '100%' }}
								slotProps={{
									input: {
										startAdornment: (
											<InputAdornment position="start">
												<Controller
													name="method"
													control={control}
													rules={{
														required:
															'Method is required',
													}}
													render={({
														field: methodField,
													}) => (
														<MethodSelect
															{...methodField}
														/>
													)}
												/>
											</InputAdornment>
										),
										placeholder: 'https://your-request.com',
									},
								}}
								error={!!errors.path}
								helperText={errors.path?.message}
							/>
						)}
					/>
				</Stack>

				<Tabs
					value={tab}
					onChange={handletabChange}
					aria-label="basic tabs example"
				>
					<Tab label="Query" />
					<Tab label="Body" />
				</Tabs>

				{tab === 0 && (
					<TableContainer
						sx={{
							flexGrow: 1,
							paddingBlock: 1,
							scrollbarWidth: 'thin',
						}}
					>
						<Table>
							<TableBody>
								{paramsFields.map((param, i) => (
									<ParamRow
										key={param.id}
										param={param}
										onChange={(newParam) =>
											handleParamChange(i, newParam)
										}
										error={!!errors.params?.[i]}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}

				{tab === 1 && (
					<>
						<Controller
							name="bodyType"
							control={control}
							rules={{ required: 'Body type is required' }}
							render={({ field }) => (
								<RadioGroup
									row
									{...field}
								>
									<FormControlLabel
										value="JSON"
										control={<Radio />}
										label="JSON"
									/>
									<FormControlLabel
										value="x-www-form-urlencoded"
										control={<Radio />}
										label="x-www-form-urlencoded"
									/>
								</RadioGroup>
							)}
						/>

						{bodyTypeWatch === 'JSON' && (
							<Controller
								name="json"
								control={control}
								rules={{
									validate: validateBody,
								}}
								render={({ field }) => (
									<TextField
										{...field}
										label="Valid json"
										multiline
										rows={8}
										error={!!errors.json}
										helperText={errors.json?.message}
										onBlur={handleJsonBlur}
									/>
								)}
							/>
						)}

						{bodyTypeWatch === 'x-www-form-urlencoded' && (
							<Controller
								name="data"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										label="Data"
										multiline
										rows={8}
										error={!!errors.data}
										helperText={errors.data?.message}
									/>
								)}
							/>
						)}
					</>
				)}
			</Stack>

			<Box textAlign="end">
				<Button
					type="submit"
					variant="contained"
					sx={{ minWidth: '100px' }}
					disabled={!isValid || !isDirty}
					loading={addMutatiom.isPending || updateMutation.isPending}
				>
					{customRequest ? 'Update' : 'Save'}
				</Button>
			</Box>
		</Stack>
	);
};

export default CustomRequest;
