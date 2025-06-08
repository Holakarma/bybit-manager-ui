import { Grid2, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { API_CONFIG_NAME } from 'shared/model/app-config/consts';

const ApiSettings = ({ control, errors }) => {
	return (
		<Grid2
			container
			spacing={2}
			columns={10}
			width="100%"
		>
			<Grid2 size={5}>
				<Controller
					name={`${API_CONFIG_NAME}.host`}
					control={control}
					render={({ field }) => (
						<TextField
							label="API Host"
							variant="outlined"
							size="small"
							fullWidth
							{...field}
							error={!!errors?.host}
							helperText={errors?.host?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size="grow">
				<Controller
					name={`${API_CONFIG_NAME}.port`}
					control={control}
					render={({ field }) => (
						<TextField
							label="API Port"
							variant="outlined"
							size="small"
							fullWidth
							{...field}
							error={!!errors?.port}
							helperText={errors?.port?.message}
						/>
					)}
				/>
			</Grid2>
		</Grid2>
	);
};

export default ApiSettings;
