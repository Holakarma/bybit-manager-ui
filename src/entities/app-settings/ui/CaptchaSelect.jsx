import { Grid2, MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const CaptchaSelect = () => {
	const [captcha, setCaptcha] = useState('recaptcha');

	const handleChange = (event) => {
		setCaptcha(event.target.value);
	};

	return (
		<Grid2
			container
			spacing={2}
		>
			<Grid2 size={4}>
				<Stack
					height="100%"
					justifyContent="center"
				>
					<Typography>Captcha service</Typography>{' '}
				</Stack>
			</Grid2>

			<Grid2 size={8}>
				<Select
					fullWidth
					size="small"
					labelId="captcha-service-select"
					value={captcha}
					onChange={handleChange}
				>
					<MenuItem value="recaptcha">recaptcha</MenuItem>
					<MenuItem value="gee4captcha">gee4captcha</MenuItem>
				</Select>{' '}
			</Grid2>
		</Grid2>
	);
};

export default CaptchaSelect;
