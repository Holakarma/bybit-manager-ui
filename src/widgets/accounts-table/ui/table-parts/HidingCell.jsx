import { useContext } from 'react';
// import ColumnVisibilityContext from '../model/visibilityContext';

const HidingCell = ({ params, hidingFn, context }) => {
	const { field } = params;
	const [visible] = useContext(context);

	return visible[field]
		? params.value
		: hidingFn
			? hidingFn(params.value)
			: '****';
};

export default HidingCell;
