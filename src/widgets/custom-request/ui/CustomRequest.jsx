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
import { useState } from 'react';
import { isEmptyValues } from 'shared/lib/isEmptyValues';
import ParamRow from './ParamRow';
import RequestTitle from './RequestTitle';

const CustomRequest = ({ ...props }) => {
	const [method, setMethod] = useState('GET');

	const handleMethodChange = (event) => {
		setMethod(event.target.value);
	};

	const [format, setFormat] = useState('JSON');

	const handleFormatChange = (event) => {
		setFormat(event.target.value);
	};

	const [params, setParams] = useState([
		{ key: '', value: '', id: Date.now() },
	]);

	const [title, setTitle] = useState('New request');

	const changeParam = (newParam, i) => {
		const isEmpty = isEmptyValues(newParam);
		if (isEmpty && i < params.length - 1) {
			setParams((prev) => [...prev].filter((p) => p.id !== newParam.id));
			return;
		}

		if (!isEmpty && i === params.length - 1) {
			setParams((prev) => [
				...prev.map((p, j) => (j === newParam.id ? newParam : p)),
				{ key: '', value: '', id: Date.now() },
			]);
			return;
		}

		setParams((prev) => prev.map((p, j) => (j === i ? newParam : p)));
	};

	const [tab, setTab] = useState(0);

	const handletabChange = (_event, newValue) => {
		setTab(newValue);
	};
	return (
		<Stack
			{...props}
			gap={2}
			justifyContent={'space-between'}
		>
			<Stack gap={2}>
				<RequestTitle
					title={title}
					onChange={setTitle}
				/>
				<Stack
					direction="row"
					gap={2}
					paddingTop={2}
				>
					<TextField
						label="Request"
						fullWidth
						sx={{ height: '100%' }}
						slotProps={{
							input: {
								startAdornment: (
									<InputAdornment position="start">
										<Select
											value={method}
											onChange={handleMethodChange}
											sx={{
												minWidth: 100,
											}}
											variant="standard"
											disableUnderline
										>
											<MenuItem value="GET">GET</MenuItem>
											<MenuItem value="POST">
												POST
											</MenuItem>
											<MenuItem value="PATCH">
												PATCH
											</MenuItem>
											<MenuItem value="DELETE">
												DELETE
											</MenuItem>
										</Select>
									</InputAdornment>
								),
								placeholder: 'https://your-request.com',
							},
						}}
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
								{params.map((param, i) => (
									<ParamRow
										key={param.id}
										param={param}
										onParamChange={(newParam) =>
											changeParam(newParam, i)
										}
									/>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}

				{tab === 1 && (
					<>
						<RadioGroup
							row
							value={format}
							onChange={handleFormatChange}
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

						<TextField
							label="Data"
							multiline
							rows={8}
						/>
					</>
				)}
			</Stack>

			<Box textAlign="end">
				<Button
					variant="contained"
					sx={{ minWidth: '100px' }}
				>
					Save
				</Button>
			</Box>
		</Stack>
	);
};

export default CustomRequest;
