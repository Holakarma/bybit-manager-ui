import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import DataObjectRoundedIcon from '@mui/icons-material/DataObjectRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { Link } from 'react-router';
import { defaultConfig } from 'shared/api';
import { getApiConfig } from 'shared/model/app-config';

const ApidocsLink = ({ direction }) => {
	const [host, port] = useMemo(() => {
		try {
			const apiConfit = getApiConfig();
			return [apiConfit.host, apiConfit.port];
		} catch {
			return [defaultConfig.host, defaultConfig.port];
		}
	}, []);

	return (
		<Stack
			direction={direction || 'column'}
			justifyContent="center"
			alignItems="center"
			gap={1}
		>
			<Tooltip
				disableInteractive
				title="swagger"
				placement="right"
			>
				<IconButton
					to={`${host}:${port}/docs`}
					target="_blank"
					component={Link}
				>
					<DataObjectRoundedIcon />
				</IconButton>
			</Tooltip>
			<Tooltip
				disableInteractive
				title="redocly"
				placement="right"
			>
				<IconButton
					to={`${host}:${port}/redoc`}
					target="_blank"
					component={Link}
				>
					<ArticleRoundedIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default ApidocsLink;
