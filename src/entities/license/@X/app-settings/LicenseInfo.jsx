import { CircularProgress, Stack, Typography } from '@mui/material';
import useLicense from '../../api/useLicence';

const LicenseInfo = () => {
	const { data: license, isLoading, isError } = useLicense();

	if (isLoading) {
		return <CircularProgress />;
	}

	if (isError) {
		return <Typography>License Error</Typography>;
	}

	console.log(license);

	return (
		<Stack gap={1}>
			<Typography>HWID: {license.hwid}</Typography>
			<Stack
				direction="row"
				gap={1}
				justifyContent="space-between"
			>
				<Typography>
					Expire: {new Date(license.cancel_date).toLocaleDateString()}
				</Typography>
				<Typography color="textSecondary">
					Modules: {license.modules.join(', ')}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default LicenseInfo;
