import {
	Box,
	CircularProgress,
	Grid2,
	List,
	ListItem,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useGetAccounts } from 'entities/account';
import { useMemo } from 'react';
import { Pulsing } from 'shared/ui/pulsing';
import color from '../model/taskColors';

const TaskResult = ({ task, tooltipText, ...props }) => {
	const { data: accounts, isLoading, isError } = useGetAccounts();

	const taskAccounts = useMemo(() => {
		if (!task || !accounts) return [];

		return task.data.map((account) => ({
			status: account.status,
			error: account.error,
			account: { ...accounts.find((a) => a.database_id === account.id) },
		}));
	}, [accounts, task]);

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
		<List {...props}>
			{taskAccounts.map((task) => (
				<ListItem
					key={task.account.database_id}
					disablePadding
				>
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
								{task.account.database_id}
							</Typography>
						</Grid2>

						<Grid2 size="grow">
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
							>
								<Typography>
									{task.account.email.address}
								</Typography>
								<Tooltip
									title={
										task.status === 'success'
											? tooltipText
											: task.error?.bybit_response
													?.ret_msg ||
												task.error?.detail ||
												'Some error occured'
									}
								>
									<Box component="span">
										<Pulsing
											animate={false}
											color={`${color[task.status]}.main`}
										/>
									</Box>
								</Tooltip>
							</Stack>
						</Grid2>
					</Grid2>
				</ListItem>
			))}
		</List>
	);
};

export default TaskResult;
