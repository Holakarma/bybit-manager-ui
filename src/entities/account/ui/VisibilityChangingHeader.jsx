import { useContext } from 'react';
import ColumnVisibilityContext from '../model/visibilityContext';
import { IconButton, Stack } from '@mui/material';
import { EyeIcon } from 'shared/assets/icons/eye';
import { HiddenEyeIcon } from 'shared/assets/icons/hidden-eye';

const VisibilityChangingHeader = ({ params }) => {
	const { field } = params;
	const [visible, setVisible] = useContext(ColumnVisibilityContext);

	const toggleColumn = () => {
		setVisible((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	return (
		<Stack
			alignItems="center"
			direction="row"
			gap={1}
		>
			{params.colDef.headerName}
			<IconButton
				onClick={(e) => {
					e.stopPropagation();
					toggleColumn();
				}}
			>
				{visible[field] ? (
					<EyeIcon size="18px" />
				) : (
					<HiddenEyeIcon size="18px" />
				)}
			</IconButton>
		</Stack>
	);
};

export default VisibilityChangingHeader;
