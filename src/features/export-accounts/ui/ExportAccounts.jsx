import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { useState } from 'react';
import exportAccounts from '../lib/exportAccounts';

const ExportAccounts = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	// const mutation = useLoginTask();

	// const [settings, setSettings] = useState({
	// 	threads: 1,
	// 	delay: { min: 60, max: 90, enabled: true },
	// 	shuffle: false,
	// });

	const startHandler = () => {
		exportAccounts(selectedAccounts);
		handleClose();
	};

	return (
		<>
			<Tooltip title="Export to xlsx">
				<Stack
					sx={{ height: '100%' }}
					justifyContent="center"
					alignItems="center"
				>
					<IconButton
						onClick={handleOpen}
						disabled={
							isLoading || isError || !selectedAccounts.length
						}
					>
						<FileUploadRoundedIcon />
					</IconButton>
				</Stack>
			</Tooltip>
			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle="Export accounts"
				taskDescription="Export accounts to xlsx"
				accounts={selectedAccounts}
				startTitle="Export"
				onStart={startHandler}
				// settingsComponent={
				// 	<Settings
				// 		settings={settings}
				// 		onSettingsChange={(newSettings) =>
				// 			setSettings(newSettings)
				// 		}
				// 	/>
				// }
			/>
		</>
	);
};

export default ExportAccounts;
