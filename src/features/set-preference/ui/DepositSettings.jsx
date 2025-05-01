import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@mui/material';
import { useMemo } from 'react';

const DepositSettings = ({ settings, onSettingsChange, ...props }) => {
	const deposit = useMemo(() => settings.deposit_to, [settings.deposit_to]);

	const handleChange = (event) => {
		onSettingsChange((prev) => ({
			...prev,
			deposit_to: event.target.value,
		}));
	};

	return (
		<FormControl {...props}>
			<FormLabel id="deposit-radio">Deposit</FormLabel>
			<RadioGroup
				aria-labelledby="deposit-radio"
				value={deposit}
				onChange={handleChange}
			>
				<FormControlLabel
					value="fund"
					control={<Radio />}
					label="Auto transfer Deposits To Funding Account"
				/>
				<FormControlLabel
					value="uta"
					control={<Radio />}
					label="Auto transfer Deposits To Unified Trading Account"
				/>
			</RadioGroup>
		</FormControl>
	);
};

export default DepositSettings;
