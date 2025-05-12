import { Grid2, MenuItem, Select, Stack, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GEE4CAPTCHA_TYPE, RECAPTCHA_TYPE } from 'shared/model/app-config';

const CaptchaSelect = ({ control, name, error }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Grid2
					container
					spacing={2}
					width="100%"
				>
					<Grid2 size={4}>
						<Stack
							height="100%"
							justifyContent="center"
						>
							<Typography>Captcha type</Typography>
						</Stack>
					</Grid2>
					<Grid2 size={8}>
						<Select
							fullWidth
							size="small"
							labelId="captcha-service-select"
							value={field.value}
							onChange={(e) => field.onChange(e.target.value)}
							error={error}
						>
							<MenuItem value={RECAPTCHA_TYPE}>
								{RECAPTCHA_TYPE}
							</MenuItem>
							<MenuItem value={GEE4CAPTCHA_TYPE}>
								{GEE4CAPTCHA_TYPE}
							</MenuItem>
						</Select>
					</Grid2>
				</Grid2>
			)}
		/>
	);
};

export default CaptchaSelect;
