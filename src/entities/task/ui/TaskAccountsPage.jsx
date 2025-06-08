import PersonOffRoundedIcon from '@mui/icons-material/PersonOffRounded';
import {
	Box,
	Checkbox,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Tooltip,
	Typography,
} from '@mui/material';
import { useState } from 'react';

const TaskAccountsPage = ({
	accounts,
	onToggle,
	initialChecked,
	disabledTooltip,
	preloginTooltip,
}) => {
	const [checked, setChecked] = useState(initialChecked);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
		onToggle(newChecked);
	};

	return (
		<Stack
			height="100%"
			gap={1}
		>
			<Box
				flexGrow={1}
				position="relative"
			>
				{accounts?.length ? (
					<List
						sx={{
							position: 'absolute',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							overflow: 'auto',
						}}
					>
						{accounts.map((account) => {
							const labelId = `checkbox-task-account-${account.database_id}`;
							const _preloginTooltip = preloginTooltip(account);
							const _disabledTooltip = disabledTooltip
								? disabledTooltip(account)
								: '';

							return (
								<ListItem
									key={account.database_id}
									disablePadding
								>
									<Tooltip
										title={
											_disabledTooltip || _preloginTooltip
										}
									>
										<Box width="100%">
											<ListItemButton
												onClick={handleToggle(
													account.database_id,
												)}
												dense
												disabled={Boolean(
													_disabledTooltip ||
														_preloginTooltip,
												)}
											>
												<ListItemIcon>
													<Checkbox
														edge="start"
														checked={checked.includes(
															account.database_id,
														)}
														disableRipple
														inputProps={{
															'aria-labelledby':
																labelId,
														}}
													/>
												</ListItemIcon>
												<ListItemText
													id={labelId}
													primary={
														account.email.address
													}
													secondary={
														account.group_name
													}
												/>
											</ListItemButton>
										</Box>
									</Tooltip>
								</ListItem>
							);
						})}
					</List>
				) : null}

				{/* No accounts handler */}
				{accounts?.length ? null : (
					<Stack
						height="100%"
						width="100%"
						color="textSecondary.default"
						justifyContent="center"
						alignItems="center"
					>
						<PersonOffRoundedIcon
							sx={{
								width: '150px',
								height: '150px',
								fill: 'currentColor',
							}}
						/>
						<Typography variant="h6">No accounts chosen</Typography>
					</Stack>
				)}
			</Box>

			{accounts?.length ? (
				<Typography
					variant="Caption"
					textAlign="end"
				>
					Total checked: {checked.length}
				</Typography>
			) : null}
		</Stack>
	);
};

export default TaskAccountsPage;
