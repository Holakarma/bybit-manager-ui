import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

const RequestBodyTab = ({
	control,
	bodyTypeWatch,
	validateBody,
	errors,
	onJsonBlur,
}) => {
	return (
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
							onBlur={onJsonBlur}
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
	);
};

export default RequestBodyTab;
