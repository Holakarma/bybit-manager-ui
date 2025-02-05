import { Box } from '@mui/material';
import { ToggleNameContext } from 'entities/account';
import { useContext } from 'react';

const ToggleNameHeader = ({ params }) => {
	const [toggleName, setToggleName] = useContext(ToggleNameContext);
	const clickHandler = (e) => {
		e.stopPropagation();
		localStorage.setItem('toggleName', !toggleName);
		setToggleName((prev) => !prev);
	};

	return <Box onClick={clickHandler}>{params.colDef.headerName}</Box>;
};

export default ToggleNameHeader;
