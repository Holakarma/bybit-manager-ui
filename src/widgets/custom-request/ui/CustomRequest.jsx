import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import {
	Box,
	Button,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Tab,
	Tabs,
} from '@mui/material';
import {
	defaultCustomRequest,
	defaultParam,
	useCustomRequests,
	useSelectedRequest,
} from 'entities/custom-request';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { stringifyCurl } from 'shared/lib/curl-parser';
import { formatJson } from 'shared/lib/format-json';
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

const CustomRequest = ({ ...props }) => {
	const customRequest = useSelectedRequest.use.request();
	const { data: customRequests } = useCustomRequests();

	const isRequestExist = useMemo(() => {
		if (customRequests && customRequest) {
			return customRequests.includes(customRequest);
		}
		return null;
	}, [customRequests, customRequest]);

	const { enqueueSnackbar } = useSnackbar();

	const {
		handleSubmit,
		control,
		formState: { errors, isValid, isDirty },
		setValue,
		trigger,
		reset,
		resetField,
		watch,
		fieldArrays,
		fieldsController,
		handleArrayFieldsChange,
	} = useCustomRequestForm(defaultCustomRequest());

	useEffect(() => {
		const paramNames = ['params', 'headers', 'cookies'];
		if (customRequest) {
			if (!isRequestExist) {
				setValue('title', customRequest.title + ' (copy)', {
					shouldDirty: true,
				});
			}

			reset(
				{
					...customRequest,
					json: formatJson(customRequest.json),
					params: [...exportParams(customRequest.params)],
					headers: [...exportParams(customRequest.headers || [])], // || [] for backward compatibility
					cookies: [...exportParams(customRequest.cookies || [])], // || [] for backward compatibility
				},
				{ keepDirty: true },
			);
			paramNames.forEach((name) => {
				fieldsController.append[name](defaultParam());
			});

			if (!isRequestExist) {
				setValue('title', customRequest.title + ' (copy)');
			}
		} else {
			reset(defaultCustomRequest());
			paramNames.forEach((name) => {
				fieldsController.replace[name]([defaultParam()]);
			});
		}
		return () => reset();
	}, [
		customRequest,
		reset,
		fieldsController,
		isRequestExist,
		setValue,
		trigger,
	]);

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
		pastehandler({ e, setValue, trigger, fieldsController, resetField });
	};

	/* Context menu */
	const handleCopy = () => {
		try {
			navigator.clipboard.writeText(stringifyCurl(customRequest));
			enqueueSnackbar('Copied to clipboard', {
				variant: 'info',
			});
		} catch (e) {
			if (!customRequest) {
				enqueueSnackbar(
					`There is nothing to copy. Try to save or update the request.`,
					{
						variant: 'warning',
					},
				);
			} else {
				enqueueSnackbar(`Did not copied to clipboard: ${e.message}`, {
					variant: 'error',
				});
			}
		}

		handleClose();
	};

	const [contextMenu, setContextMenu] = useState(null);
	const handleContextMenu = (event) => {
		event.preventDefault();
		setContextMenu(
			contextMenu === null
				? {
						mouseX: event.clientX + 2,
						mouseY: event.clientY - 6,
					}
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
					// Other native context menus might behave different.
					// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
					null,
		);
	};
	const handleClose = () => {
		setContextMenu(null);
	};

	return (
		<>
			<Stack
				{...props}
				gap={2}
				component={'form'}
				onSubmit={handleSubmit(onSubmit)}
				justifyContent={'space-between'}
			>
				<Stack
					gap={2}
					flexGrow={1}
				>
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
						onContextMenu={handleContextMenu}
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
					>
						<Tab label="Query" />
						<Tab label="Body" />
						<Tab label="Headers" />
						<Tab label="Cookies" />
					</Tabs>

					<Box
						flexGrow={1}
						position="relative"
					>
						<Box
							position="absolute"
							height="100%"
							width="100%"
							overflow="auto"
						>
							{/* Params */}
							{tab === 0 && (
								<ParamsTab
									onChange={(newParam, i) =>
										handleArrayFieldsChange(
											i,
											newParam,
											'params',
										)
									}
									paramsFields={fieldArrays['params']}
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
							{tab === 2 && (
								<HeadersTab
									array={fieldArrays['headers']}
									errors={errors}
									onChange={(newParam, i) =>
										handleArrayFieldsChange(
											i,
											newParam,
											'headers',
										)
									}
								/>
							)}

							{/* Cookies */}
							{tab === 3 && (
								<CookiesTab
									array={fieldArrays['cookies']}
									errors={errors}
									onChange={(newParam, i) =>
										handleArrayFieldsChange(
											i,
											newParam,
											'cookies',
										)
									}
								/>
							)}
						</Box>
					</Box>
				</Stack>

				<Box textAlign="end">
					<Button
						type="submit"
						variant="contained"
						sx={{ minWidth: '100px' }}
						disabled={!isValid || !isDirty}
						loading={isLoading}
					>
						{isRequestExist ? 'Update' : 'Save'}
					</Button>
				</Box>
			</Stack>

			<Menu
				open={contextMenu !== null}
				onClose={handleClose}
				anchorReference="anchorPosition"
				anchorPosition={
					contextMenu !== null
						? {
								top: contextMenu.mouseY,
								left: contextMenu.mouseX,
							}
						: undefined
				}
			>
				<MenuItem onClick={handleCopy}>
					<ListItemIcon>
						<ContentCopyIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText>copy as curl(Bash)</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomRequest;
