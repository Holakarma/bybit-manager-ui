import { useMemo } from 'react';
import get2faColumns from '../model/columns-model/2faColumns';
import getBalanceColumns from '../model/columns-model/BalanceColumns';
import getDepositColumns from '../model/columns-model/DepositColumns';
import getGeneralColumns from '../model/columns-model/GeneralColumns';
import getRegisterColumns from '../model/columns-model/RegisterColumns';

const useColumns = (props) => useMemo(() => getColumnsModel(props), [props]);

export const getColumnsModel = ({
	toggleName,
	layer = 'general',
	additionalColumns = [],
	widths = {},
} = {}) => {
	switch (layer) {
		case 'balances':
			return [
				...getBalanceColumns(toggleName, widths),
				...additionalColumns,
			];
		case 'register':
			return [
				...getRegisterColumns(toggleName, widths),
				...additionalColumns,
			];
		case '2fa':
			return [...get2faColumns(toggleName, widths), ...additionalColumns];
		case 'deposit':
			return [
				...getDepositColumns(toggleName, widths),
				...additionalColumns,
			];
		case 'general':
		default:
			return [
				...getGeneralColumns(toggleName, widths),
				...additionalColumns,
			];
	}
};

export default useColumns;
