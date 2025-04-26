import {
	Autocomplete,
	Avatar,
	CircularProgress,
	Stack,
	TextField,
} from '@mui/material';
import {
	createContext,
	forwardRef,
	useContext,
	useEffect,
	useRef,
} from 'react';
import { VariableSizeList } from 'react-window';

const LISTBOX_PADDING = 8;

function renderRow(props) {
	const { data, index, style } = props;
	const dataSet = data[index];
	const inlineStyle = {
		...style,
		top: style.top + LISTBOX_PADDING,
	};

	const { key, ...optionProps } = dataSet[0];

	return (
		<Stack
			key={key}
			component="li"
			{...optionProps}
			style={inlineStyle}
			direction="row"
			gap={2}
		>
			<Avatar
				alt={dataSet[1].coin}
				src={dataSet[1].icon_night_url}
			/>
			{dataSet[1].coin}
		</Stack>
	);
}

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

export const ListboxComponent = forwardRef(
	function ListboxComponent(props, ref) {
		const { children, ...other } = props;
		const itemData = [];
		children.forEach((item) => {
			itemData.push(item);
			itemData.push(...(item.children || []));
		});

		const itemCount = itemData.length;
		const itemSize = 45;

		const getChildSize = () => {
			return itemSize;
		};

		const getHeight = () => {
			if (itemCount > 8) {
				return 8 * itemSize;
			}
			return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
		};

		const gridRef = useResetCache(itemCount);

		return (
			<div ref={ref}>
				<OuterElementContext.Provider value={other}>
					<VariableSizeList
						itemData={itemData}
						height={getHeight() + 2 * LISTBOX_PADDING}
						width="100%"
						ref={gridRef}
						outerElementType={OuterElementType}
						innerElementType="ul"
						itemSize={(index) => getChildSize(itemData[index])}
						overscanCount={5}
						itemCount={itemCount}
					>
						{renderRow}
					</VariableSizeList>
				</OuterElementContext.Provider>
			</div>
		);
	},
);

const CoinsPicker = ({ loading, startAdornment, ...props }) => {
	return (
		<Autocomplete
			{...props}
			isOptionEqualToValue={(option, value) => option.coin === value.coin}
			disablePortal
			size="small"
			fullWidth
			loading={loading}
			getOptionLabel={(option) => option.coin}
			disableClearable
			renderOption={(props, option, state) => [
				props,
				option,
				state.index,
			]}
			slotProps={{
				listbox: {
					component: ListboxComponent,
				},
			}}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Coin"
					slotProps={{
						input: {
							...params.InputProps,
							endAdornment: (
								<>
									{loading ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
								</>
							),
							startAdornment: (
								<>
									{startAdornment || null}
									{params.InputProps.startAdornment}
								</>
							),
						},
					}}
				/>
			)}
		/>
	);
};

export default CoinsPicker;
