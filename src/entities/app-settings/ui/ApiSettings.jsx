import { Grid2, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const ApiSettings = ({ onSettingsChange, defaultSettings }) => {
	/* Host */
	const [host, setHost] = useState(defaultSettings.host);
	const [hostError, setHostError] = useState('');

	const validateHost = (value) => {
		if (!value) {
			setHostError('Host is required');
			return false;
		}
		setHostError('');
		return true;
	};

	const handleHostChange = (e) => {
		const value = e.target.value;
		setHost(value);
		validateHost(value);
	};

	/* Port */
	const [port, setPort] = useState(defaultSettings.port);
	const [portError, setPortError] = useState('');

	const validatePort = (value) => {
		if (!value) {
			setPortError('Port is required');
			return false;
		}
		const portNumber = Number(value);
		if (isNaN(portNumber)) {
			setPortError('Port must be a number');
			return false;
		}
		if (portNumber < 0 || portNumber > 65535) {
			setPortError('Port must be between 0 and 65535');
			return false;
		}
		setPortError('');
		return true;
	};

	const handlePortChange = (e) => {
		const value = e.target.value;
		setPort(value);
		validatePort(value);
	};

	/* Effects */
	useEffect(() => {
		if (onSettingsChange) {
			if (hostError || portError) {
				onSettingsChange(null);
				return;
			}

			onSettingsChange({ host, port });
		}
	}, [host, port, hostError, portError, onSettingsChange]);

	useEffect(() => {
		setHostError(false);
		setPortError(false);
		setHost(defaultSettings.host);
		setPort(defaultSettings.port);
	}, [defaultSettings]);

	return (
		<Grid2
			container
			spacing={2}
		>
			<Grid2 size={6}>
				<TextField
					label="API Host"
					variant="outlined"
					size="small"
					fullWidth
					onChange={handleHostChange}
					value={host}
					error={!!hostError}
					helperText={hostError}
				/>
			</Grid2>
			<Grid2 size={6}>
				<TextField
					label="API Port"
					variant="outlined"
					size="small"
					fullWidth
					onChange={handlePortChange}
					value={port}
					error={!!portError}
					helperText={portError}
				/>
			</Grid2>
		</Grid2>
	);
};

export default ApiSettings;
