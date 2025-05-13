import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	CircularProgress,
	Grid2,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useAccounts } from 'entities/account';
import { groupedLogs } from 'entities/log';
import { color } from 'entities/task';
import { useMemo } from 'react';
import { Pulsing } from 'shared/ui/pulsing';

const CustomRequestTaskResult = ({ task, ...props }) => {
	const grouped = useMemo(() => groupedLogs(task.logs), [task.logs]);
	const {
		data: accounts,
		isLoading,
		isError,
	} = useAccounts({ body: { database_ids: Object.keys(grouped) } });

	const firstLog = useMemo(() => {
		return task.logs[0];
	}, [task.logs]);

	if (isLoading) {
		return (
			<Box {...props}>
				<Stack
					alignItems="center"
					justifyContent="center"
					height="100px"
				>
					<CircularProgress />
				</Stack>
			</Box>
		);
	}
	if (isError) {
		return (
			<Box {...props}>
				<Stack
					alignItems="center"
					justifyContent="center"
					height="100px"
				>
					<Typography color="error">
						Error while getting accounts
					</Typography>
				</Stack>
			</Box>
		);
	}

	return (
		<Box {...props}>
			{accounts.map((account) => (
				<Accordion
					sx={{ width: '100%' }}
					key={account.database_id}
				>
					<AccordionSummary>
						<Grid2
							container
							spacing={2}
							width="100%"
						>
							<Grid2 size="auto">
								<Typography
									variant="Caption"
									color="textSecondary"
								>
									{account.database_id}
								</Typography>
							</Grid2>

							<Grid2 size="grow">
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
								>
									<Typography>
										{account.email.address}
									</Typography>
									<Tooltip title={firstLog.message}>
										<Box component="span">
											<Pulsing
												animate={false}
												color={`${firstLog.type || 'warning'}.main`}
											/>
										</Box>
									</Tooltip>
								</Stack>
							</Grid2>
						</Grid2>
					</AccordionSummary>
					<AccordionDetails>
						<Stack gap={1}>
							{task.logs.map((log) => (
								<Typography
									variant="Caption"
									key={log.message}
									color={`${color[log.type]}.main`}
								>
									{log.message}
								</Typography>
							))}
						</Stack>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	);
};

export default CustomRequestTaskResult;
