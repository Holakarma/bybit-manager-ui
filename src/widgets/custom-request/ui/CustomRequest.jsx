import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { useSelectedRequest } from 'entities/custom-request';
import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { formatJson } from 'shared/lib/format-json';
import { uniqueId } from 'shared/lib/generateUniqueId';
import { exportParams } from 'shared/lib/param-parser';
import RequestFormContainer from '../containers/handleSubmitContainer';
import pastehandler from '../lib/pasteHandler';
import useCustomRequestForm from '../model/customRequestForm';
import CookiesTab from './CookiesTab';
import HeadersTab from './HeadersTab';
import ParamsTab from './ParamsTab';
import PathController from './PathController';
import RequestBodyTab from './RequestBodyTab';
import RequestTitle from './RequestTitle';

const defaultCustomRequest = () => ({
	method: 'GET',
	path: '',
	json: '{}',
	data: '',
	params: [{ key: '', value: '', avtive: false }],
	bodyType: 'JSON',
	title: 'New request',
	id: uniqueId(),
});

const CustomRequest = ({ ...props }) => {
	const customRequest = useSelectedRequest.use.request();

	const {
		handleSubmit,
		control,
		formState: { errors, isValid, isDirty },
		setValue,
		trigger,
		reset,
		resetField,
		watch,
		paramsFields,
		append,
		remove,
		handleParamChange,
	} = useCustomRequestForm(defaultCustomRequest());

	useEffect(() => {
		if (customRequest) {
			reset({
				...customRequest,
				json: formatJson(customRequest.json),
				params: [...exportParams(customRequest.params)],
			});
			append({ key: '', value: '' });
		} else {
			reset(defaultCustomRequest());
		}
		return () => reset();
	}, [customRequest, reset, append]);

	const { onSubmit, isLoading } = RequestFormContainer();

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
		pastehandler({ e, setValue, trigger, remove, append, resetField });
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
					<PathController
						control={control}
						errors={errors}
						onPaste={handlePaste}
					/>
				</Stack>

				<Tabs
					value={tab}
					onChange={handletabChange}
					aria-label="basic tabs example"
				>
					<Tab label="Query" />
					<Tab label="Body" />
					<Tab label="Headers" />
					<Tab label="Cookies" />
				</Tabs>

				{/* Params */}
				{tab === 0 && (
					<ParamsTab
						onChange={(newParam, i) =>
							handleParamChange(i, newParam)
						}
						paramsFields={paramsFields}
						errors={errors}
					/>
				)}

				{/* Body */}
				{tab === 1 && (
					<RequestBodyTab
						onJsonBlur={handleJsonBlur}
						control={control}
						bodyTypeWatch={bodyTypeWatch}
						validateBody={validateBody}
						errors={errors}
					/>
				)}

				{/* Headers */}
				{tab === 3 && (
					<HeadersTab
						control={control}
						errors={errors}
					/>
				)}

				{/* Cookies */}
				{tab === 4 && (
					<CookiesTab
						control={control}
						errors={errors}
					/>
				)}
			</Stack>

			<Box textAlign="end">
				<Button
					type="submit"
					variant="contained"
					sx={{ minWidth: '100px' }}
					disabled={!isValid || !isDirty}
					loading={isLoading}
				>
					{customRequest ? 'Update' : 'Save'}
				</Button>
			</Box>
		</Stack>
	);
};

export default CustomRequest;
