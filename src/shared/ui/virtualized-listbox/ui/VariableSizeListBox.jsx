import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from 'react';
import { VariableSizeList } from 'react-window';
import { min } from 'shared/lib/min';

const OuterElementContext = createContext({});

const OuterElementType = forwardRef(function OuterElementType(props, ref) {
	const outerProps = useContext(OuterElementContext);
	return (
		<div
			ref={ref}
			{...props}
			{...outerProps}
		/>
	);
});

const useResetCache = (data) => {
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
};

export const VariableSizeListbox = forwardRef(
	function ListboxComponent(props, ref) {
		const {
			children,
			renderRow,
			LISTBOX_PADDING = 8,
			itemSize = 45,
			...other
		} = props;

		const itemData = useMemo(() => {
			const data = [];
			children.forEach((item) => {
				data.push(item);
				data.push(...(item.children || []));
			});
			return data;
		}, [children]);

		const itemCount = itemData.length;

		const gridRef = useResetCache(itemCount);

		return (
			<div ref={ref}>
				<OuterElementContext.Provider value={other}>
					<VariableSizeList
						itemData={itemData}
						height={
							min(itemData.length, 8) * itemSize +
							2 * LISTBOX_PADDING
						}
						width="100%"
						ref={gridRef}
						outerElementType={OuterElementType}
						innerElementType="ul"
						itemSize={() => itemSize}
						overscanCount={1}
						itemCount={itemCount}
					>
						{renderRow}
					</VariableSizeList>
				</OuterElementContext.Provider>
			</div>
		);
	},
);

export default VariableSizeListbox;
