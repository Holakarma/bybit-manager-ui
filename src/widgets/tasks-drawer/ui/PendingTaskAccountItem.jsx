import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Grid2,
	Skeleton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useAccounts } from 'entities/account';
import { useMemo } from 'react';
import { Pulsing } from 'shared/ui/pulsing';

const PendingTaskAccountItem = ({ database_id, logs }) => {
	const {
		data: account,
		isLoading,
		isError,
	} = useAccounts({ body: { database_ids: [database_id] } });

	const firstLog = useMemo(() => {
		if (logs) {
			return logs[0];
		}
		return null;
	}, [logs]);

	const statusColor = useMemo(() => {
		if (!firstLog) return 'warning';

		if (firstLog.type === 'error' || firstLog.type === 'success') {
			return firstLog.type;
		}
		return 'info';
	}, [firstLog]);

	if (isLoading) {
		return <Skeleton width="100%" />;
	}

	if (isError) {
		return <Typography>Error while getting account</Typography>;
	}

	return (
		<Accordion
			sx={{ width: '100%' }}
			disabled={!logs}
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
							{database_id}
						</Typography>
					</Grid2>

					<Grid2 size="grow">
						<Stack
							direction="row"
							gap={1}
							justifyContent="space-between"
						>
							<Typography>{account[0].email.address}</Typography>
							<Typography color="textSecondary">
								{account[0].group_name}
							</Typography>
						</Stack>
					</Grid2>

					<Grid2 size={'auto'}>
						<Stack
							alignItems="center"
							justifyContent="center"
							height="100%"
						>
							<Tooltip
								title={
									statusColor === 'warning'
										? 'waiting'
										: firstLog.message
								}
							>
								<Box>
									<Pulsing
										animate={
											statusColor === 'warning'
												? true
												: false
										}
										color={`${statusColor}.main`}
									/>
								</Box>
							</Tooltip>
						</Stack>
					</Grid2>
				</Grid2>
			</AccordionSummary>
			{logs && (
				<AccordionDetails>
					<Stack gap={1}>
						{logs.map((log) => (
							<Typography
								variant="Caption"
								key={log.message}
								color={`${log.type}.main`}
							>
								{log.message}
							</Typography>
						))}
					</Stack>
				</AccordionDetails>
			)}
		</Accordion>
	);
};

export default PendingTaskAccountItem;
