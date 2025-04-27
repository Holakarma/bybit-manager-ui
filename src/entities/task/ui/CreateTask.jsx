import { useSelectedAccounts } from 'entities/account';
import { TaskModal } from 'entities/task';
import { cloneElement, useCallback, useEffect, useState } from 'react';
import { isCookieAlive } from 'shared/lib/session-cookies';

const CreateTask = ({
	handleStart,
	task,
	pages,
	settings,
	disabledTooltip,
	errorText,
	startTitle,
	children,
	loading,
	onCheckedIdsChange,
	settingsAdapter = (settings) => settings,
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
			settings: settingsAdapter(settings),
		});
		handleClose();
	};

	const [checkedIds, setCheckedIds] = useState([]);

	useEffect(() => {
		if (onCheckedIdsChange) {
			onCheckedIdsChange(checkedIds);
		}
	}, [checkedIds, onCheckedIdsChange]);

	const preloginTooltip = useCallback(
		(account) =>
			settings?.prelogin !== undefined && // if no prelogin setting
			!settings?.prelogin &&
			!isCookieAlive(account.cookies)
				? 'No session'
				: '',
		[settings?.prelogin],
	);

	useEffect(() => {
		if (selectedAccounts) {
			let accounts = [];
			accounts = selectedAccounts.filter(
				(account) => !preloginTooltip(account),
			);

			if (disabledTooltip) {
				accounts = accounts.filter(
					(account) => !disabledTooltip(account),
				);
			}

			setCheckedIds(accounts.map((account) => account.database_id));
		}
	}, [selectedAccounts, disabledTooltip, task, preloginTooltip]);

	if (isLoading) {
		return cloneElement(children, { ...props, loading: isLoading });
	}

	if (isError) {
		return cloneElement(children, {
			...props,
			disabled: true,
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
				loading={loading}
				pages={pages.map((page) => ({
					...page,
					component: cloneElement(page.component, {
						key: page.title,
						accounts: selectedAccounts,
						onToggle: (checked) => setCheckedIds(checked),
						initialChecked: checkedIds,
						disabledTooltip,
						preloginTooltip,
					}),
				}))}
			/>
		</>
	);
};

export default CreateTask;
