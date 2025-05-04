import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import ParamsTab from './ParamsTab';

const hideDescription = {
	_by_l_g_d: 'generates automatically',
	'secure-token': 'auth token',
	'self-unbind-token': 'requests automatically',
	BYBIT_REG_REF_prod: 'generates automatically',
};

const CookiesTab = ({ array, errors, onChange }) => {
	const [showHiddenCookies, setShowHiddenCookies] = useState(false);

	const filter = (param) => !hideDescription[param.key];

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
						showHiddenCookies ? (
							<VisibilityOffRoundedIcon />
						) : (
							<VisibilityRoundedIcon />
						)
					}
					onClick={() => setShowHiddenCookies((prev) => !prev)}
				>
					{showHiddenCookies
						? 'Hide hidden cookies'
						: 'Show hidden cookies'}
				</Button>
			</Stack>
			<ParamsTab
				onChange={onChange}
				filter={filter}
				enableFilter={!showHiddenCookies}
				paramsFields={array}
				errors={errors}
				hiddenValueLabel={(param) => {
					return hideDescription[param.key];
				}}
			/>
		</Stack>
	);
};

export default CookiesTab;
