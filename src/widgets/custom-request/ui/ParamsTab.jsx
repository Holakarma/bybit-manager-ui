import { Table, TableBody, TableContainer } from '@mui/material';
import ParamRow from './ParamRow';

const ParamsTab = ({
	paramsFields,
	onChange,
	errors,
	filter,
	enableFilter,
	hiddenValueLabel,
}) => {
	return (
		<TableContainer
			sx={{
				flexGrow: 1,
				scrollbarWidth: 'thin',
			}}
		>
			<Table>
				<TableBody>
					{paramsFields.map((param, i) => {
						if (enableFilter && !filter(param)) {
							return null;
						}

						return (
							<ParamRow
								key={param.id}
								sx={
									filter && {
										opacity: filter(param) ? '' : '0.6',
									}
								}
								param={param}
								onChange={(newParam) => onChange(newParam, i)}
								error={!!errors.params?.[i]}
								hiddenValueLabel={hiddenValueLabel}
							/>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ParamsTab;
