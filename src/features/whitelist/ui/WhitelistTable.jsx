import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import {
	CircularProgress,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { useAccounts } from 'entities/account';

const WhitelistTable = ({ settings, ids }) => {
	const {
		data: accounts,
		isLoading,
		isError,
	} = useAccounts({
		database_ids: ids,
	});

	if (isLoading) {
		return (
			<Stack
				height="100%"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Stack>
		);
	}

	if (isError) {
		return <Typography>Some error occured</Typography>;
	}

	return (
		<Stack
			width="100%"
			height="100%"
		>
			<TableContainer sx={{ flexGrow: 1 }}>
				<Table sx={{ minWidth: 650, whiteSpace: 'nowrap' }}>
					<TableHead>
						<TableRow>
							<TableCell>Account</TableCell>
							<TableCell>Address</TableCell>
							{settings.chain.has_memo && (
								<TableCell>Memo</TableCell>
							)}
							{settings.remark && <TableCell>Remark</TableCell>}
							<TableCell>Chain</TableCell>
							{!settings.universal && <TableCell>Coin</TableCell>}
							<TableCell>Verified</TableCell>
							<TableCell>Default</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{accounts.map((account) => (
							<TableRow
								key={account.email.address}
								sx={{
									'&:last-child td, &:last-child th': {
										border: 0,
									},
								}}
							>
								<TableCell
									component="th"
									scope="row"
								>
									{account.database_id}:{' '}
									{account.email.address}
								</TableCell>
								<TableCell>
									{settings.addresses[
										account.database_id
									] || (
										<Typography
											variant="Caption"
											color="textSecondary"
										>
											No address provided
										</Typography>
									)}
								</TableCell>
								{settings.chain.has_memo && (
									<TableCell>
										{settings.memo[account.database_id] || (
											<Typography
												variant="Caption"
												color="textSecondary"
											>
												No memo provided
											</Typography>
										)}
									</TableCell>
								)}
								{settings.remark && (
									<TableCell>{settings.remark}</TableCell>
								)}
								<TableCell>
									{settings.chain.chain_full_name}
								</TableCell>
								{!settings.universal && (
									<TableCell>{settings.coin.coin}</TableCell>
								)}
								<TableCell align="center">
									{settings.verify ? (
										<CheckRoundedIcon color="success" />
									) : (
										<ClearRoundedIcon color="error" />
									)}
								</TableCell>
								<TableCell align="center">
									{settings.setAsDefault ? (
										<CheckRoundedIcon color="success" />
									) : (
										<ClearRoundedIcon color="error" />
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};

export default WhitelistTable;
