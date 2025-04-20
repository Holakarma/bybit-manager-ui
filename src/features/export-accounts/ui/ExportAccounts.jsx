import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { IconButton, Stack, Tooltip } from '@mui/material';
import { CreateTask, TaskAccountsPage } from 'entities/task';
import { useState } from 'react';
import { default as useExportAccounts } from '../lib/exportAccounts';

const ExportAccounts = () => {
	const mutation = useExportAccounts();

	const [tooltipOpen, setTooltipOpen] = useState(false);

	return (
		<>
			<Tooltip
				title="Export to xlsx"
				open={tooltipOpen}
			>
				<Stack
					sx={{ height: '100%' }}
					justifyContent="center"
					alignItems="center"
				>
					<CreateTask
						handleStart={mutation.mutate}
						task="export"
						pages={[
							{
								title: 'Accounts',
								component: <TaskAccountsPage key="accounts" />,
							},
						]}
						startTitle="Export"
					>
						<IconButton
							onMouseEnter={() => setTooltipOpen(true)}
							onMouseLeave={() => setTooltipOpen(false)}
						>
							<FileUploadRoundedIcon />
						</IconButton>
					</CreateTask>
				</Stack>
			</Tooltip>
		</>
	);
};

export default ExportAccounts;
