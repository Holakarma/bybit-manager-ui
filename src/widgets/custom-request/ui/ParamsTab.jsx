import { Table, TableBody, TableContainer } from '@mui/material';
import ParamRow from './ParamRow';

const ParamsTab = ({ paramsFields, onChange, errors }) => {
	return (
		<TableContainer
			sx={{
				flexGrow: 1,
				paddingBlock: 1,
				scrollbarWidth: 'thin',
			}}
		>
			<Table>
				<TableBody>
					{paramsFields.map((param, i) => (
						<ParamRow
							key={param.id}
							param={param}
							onChange={(newParam) => onChange(newParam, i)}
							error={!!errors.params?.[i]}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ParamsTab;
