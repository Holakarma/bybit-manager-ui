import { Skeleton, Stack, Typography } from '@mui/material';
import useLicense from '../../api/useLicence';

const LicenseInfo = () => {
	const { data: license, isLoading, isError } = useLicense();

	if (isLoading) {
		return (
			<Stack gap={1}>
				<Typography>
					<Skeleton
						variant="text"
						sx={{ fontSize: 'inherit' }}
					/>
				</Typography>
				<Typography>
					<Skeleton
						variant="text"
						sx={{ fontSize: 'inherit' }}
					/>
				</Typography>
				<Typography color="textSecondary">
					<Skeleton
						variant="text"
						sx={{ fontSize: 'inherit' }}
					/>
				</Typography>
			</Stack>
		);
	}

	if (isError) {
		return <Typography>License Error</Typography>;
	}

	return (
		<Stack gap={1}>
			<Typography>HWID: {license.hwid}</Typography>
			<Typography>
				Expire: {new Date(license.cancel_date).toLocaleDateString()}
			</Typography>
			<Typography color="textSecondary">
				Modules: {license.modules.join(', ')}
			</Typography>
		</Stack>
	);
};

export default LicenseInfo;
