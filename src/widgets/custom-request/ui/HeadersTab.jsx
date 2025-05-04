import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ParamsTab from './ParamsTab';

const headersToHide = [
	'accept',
	'accept-language',
	'content-type',
	'lang',
	'origin',
	'platform',
	'priority',
	'referer',
	'sec-ch-ua',
	'sec-ch-ua-mobile',
	'sec-ch-ua-platform',
	'sec-fetch-dest',
	'sec-fetch-mode',
	'sec-fetch-site',
	'traceparent',
	'user-agent',
];

const HeadersTab = ({ array, errors, onChange }) => {
	const [showHiddenHeaders, setShowHiddenHeaders] = useState(false);

	const filter = (param) => !headersToHide.includes(param.key.toLowerCase());

	return (
		<Stack
			alignItems="end"
			gap={1}
		>
			<Stack
				direction="row"
				alignItems="center"
				gap={2}
			>
				<Typography variant="Caption">
					{array.length - array.filter(filter).length} hidden
				</Typography>
				<Button
					size="small"
					variant="contained"
					color="secondary"
					startIcon={
						showHiddenHeaders ? (
							<VisibilityOffRoundedIcon />
						) : (
							<VisibilityRoundedIcon />
						)
					}
					onClick={() => setShowHiddenHeaders((prev) => !prev)}
				>
					{showHiddenHeaders
						? 'Hide auto-generated headers'
						: 'Show auto-generated headers'}
				</Button>
			</Stack>

			<ParamsTab
				onChange={onChange}
				filter={filter}
				enableFilter={!showHiddenHeaders}
				paramsFields={array}
				errors={errors}
			/>
		</Stack>
	);
};

export default HeadersTab;
