import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { cloneElement, useEffect, useState } from 'react';

const CreateTask = ({
	handleStart,
	task,
	pages,
	settings,
	filterAccounts,
	errorText,
	startTitle,
	children,
	...props
}) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const {
		data: selectedAccounts,
		isLoading,
		isError,
	} = useSelectedAccounts();

	const startHandler = () => {
		handleStart({
			database_ids: checkedIds,
			settings,
		});
		handleClose();
	};

	const [checkedIds, setCheckedIds] = useState([]);

	useEffect(() => {
		if (selectedAccounts) {
			if (filterAccounts) {
				setCheckedIds(
					selectedAccounts
						.filter(filterAccounts)
						.map((account) => account.database_id),
				);
			} else {
				setCheckedIds(
					selectedAccounts.map((account) => account.database_id),
				);
			}
		}
	}, [selectedAccounts, filterAccounts, task]);

	if (isLoading) {
		return cloneElement(children, { ...props, loading: isLoading });
	}

	if (isError) {
		return cloneElement(children, {
			...props,
			disabled: true,
			children: 'Error',
		});
	}

	return (
		<>
			{cloneElement(children, { ...props, onClick: handleOpen })}

			<TaskModal
				open={open}
				onClose={handleClose}
				taskTitle={`Create ${task} task`}
				accounts={selectedAccounts}
				onStart={startHandler}
				startButtonProps={{
					disabled: checkedIds.length === 0 || Boolean(errorText),
				}}
				startTitle={startTitle}
				errorText={errorText}
				pages={pages.map((page) => ({
					...page,
					component: cloneElement(page.component, {
						key: page.title,
						accounts: selectedAccounts,
						onToggle: (checked) => setCheckedIds(checked),
						initialChecked: checkedIds,
					}),
				}))}
			/>
		</>
	);
};

export default CreateTask;
