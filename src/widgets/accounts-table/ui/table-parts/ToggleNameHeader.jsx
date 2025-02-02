import { Box } from '@mui/material';
import { ToggleNameContext } from 'entities/account';
import { useContext } from 'react';

const ToggleNameHeader = ({ params }) => {
	const [_toggleName, setToggleName] = useContext(ToggleNameContext);
	const clickHandler = (e) => {
		e.stopPropagation();
		setToggleName((prev) => !prev);
	};

	return <Box onClick={clickHandler}>{params.colDef.headerName}</Box>;
};

export default ToggleNameHeader;
