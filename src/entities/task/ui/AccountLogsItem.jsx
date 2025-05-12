import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Grid2,
	ListItem,
	Skeleton,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useAccounts } from 'entities/account';
import { useMemo } from 'react';
import { Pulsing } from 'shared/ui/pulsing';

const AccountLogsItem = ({ logs, database_id }) => {
	const {
		data: accounts,
		isLoading,
		isError,
	} = useAccounts({ database_ids: [database_id] });

	const account = useMemo(() => {
		if (!accounts) return null;

		return accounts[0];
	}, [accounts]);

	const firstLog = useMemo(() => {
		return logs[0];
	}, [logs]);

	if (isLoading) {
		return (
			<ListItem
				key={logs.database_id}
				disablePadding
			>
				<Skeleton
					width="100%"
					height="48px"
					variant="rounded"
				/>
			</ListItem>
		);
	}
	if (isError) {
		return (
			<ListItem
				key={logs.database_id}
				disablePadding
			>
				<Typography>Error</Typography>
			</ListItem>
		);
	}

	return (
		<Accordion sx={{ width: '100%' }}>
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
							justifyContent="space-between"
							alignItems="center"
						>
							<Typography>{account.email.address}</Typography>
							<Typography>{account.group_name}</Typography>
						</Stack>
					</Grid2>

					<Grid2 size={1}>
						<Stack
							alignItems="center"
							justifyContent="center"
							height="100%"
						>
							<Tooltip title={firstLog.message}>
								<Box>
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
					{logs.map((log) => (
						<Typography
							variant="Caption"
							key={log.message}
							color={log.type}
						>
							{log.message}
						</Typography>
					))}
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default AccountLogsItem;
