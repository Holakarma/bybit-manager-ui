import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import { Chip, Stack, Tooltip, Typography } from '@mui/material';

const PROXY_ERRORS = {
	PROXY_CONNECTION_ERROR: {
		label: 'Connection error',
		icon: <LinkOffIcon fontSize="small" />,
	},
	PROXY_PAYMENT_REQUIRED: {
		label: 'Payment required',
		icon: <AttachMoneyIcon fontSize="small" />,
	},
};

const ProxyCell = ({ params }) => {
	const value = params.formattedValue;

	if (!value?.proxy) {
		return null;
	}
	return (
		<Stack
			width="100%"
			height="100%"
			direction="row"
			justifyContent="start"
			alignItems="center"
			gap={2}
		>
			<Chip
				label={value.proxy.protocol}
				size="small"
				variant="outlined"
				color={value.proxy.protocol === 'socks5' ? 'success' : 'info'}
				sx={{ minWidth: '65px' }}
			/>
			<Typography variant="Body">{value.proxy.host}</Typography>

			{value.error ? (
				<Tooltip title={PROXY_ERRORS[value.error].label}>
					<Stack color="error.main">
						{PROXY_ERRORS[value.error].icon}
					</Stack>
				</Tooltip>
			) : null}
		</Stack>
	);
};

export default ProxyCell;
