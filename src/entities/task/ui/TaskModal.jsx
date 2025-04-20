import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useState } from 'react';
import { ModalBody } from 'shared/ui/modal-body';

const TaskModal = ({
	open,
	onClose,
	taskTitle,
	onStart,
	pages,
	startButtonProps,
	startTitle,
	errorText,
}) => {
	const [page, setPage] = useState(0);

	const handleClose = () => {
		onClose();
		setPage(0);
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<Box>
				<ModalBody
					sx={{ minWidth: '500px' }}
					position="relative"
				>
					<Stack
						direction="row"
						gap={2}
						height="100%"
					>
						<Stack
							width="100%"
							flexGrow={1}
						>
							<Typography variant="H5">{taskTitle}</Typography>

							<Typography
								variant="Title"
								marginTop={2}
								color="textSecondary"
							>
								{pages?.[page].title}
							</Typography>

							<Box
								flexGrow={1}
								paddingBlock={2}
							>
								{pages?.[page].component || null}
							</Box>

							<Stack
								direction="row"
								justifyContent="space-between"
							>
								{page !== 0 ? (
									<Button
										onClick={() => setPage(page - 1)}
										startIcon={<ArrowBackRoundedIcon />}
									>
										{pages?.[page - 1].title}
									</Button>
								) : null}

								{page !== pages?.length - 1 ? (
									<Button
										onClick={() => setPage(page + 1)}
										sx={{ marginLeft: 'auto' }}
										endIcon={<ArrowForwardRoundedIcon />}
									>
										{pages?.[page + 1].title}
									</Button>
								) : null}

								{page === pages?.length - 1 && (
									<Button
										onClick={onStart}
										variant={'contained'}
										sx={{ marginLeft: 'auto' }}
										{...startButtonProps}
									>
										{errorText ||
											startTitle ||
											'Start task'}
									</Button>
								)}
							</Stack>
						</Stack>
					</Stack>
				</ModalBody>
			</Box>
		</Modal>
	);
};

export default TaskModal;
