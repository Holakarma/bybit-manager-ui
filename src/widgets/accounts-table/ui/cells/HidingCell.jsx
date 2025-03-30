import { useContext } from 'react';
// import ColumnVisibilityContext from '../model/visibilityContext';

const HidingCell = ({ params, hidingFn, context, children }) => {
	const { field } = params;
	const [visible] = useContext(context);

	return visible[field] ? children : hidingFn ? hidingFn(children) : '****';
};

export default HidingCell;
