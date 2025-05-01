import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { isEmptyValues } from 'shared/lib/isEmptyValues';

const useCustomRequestForm = (defaultValues) => {
	const form = useForm({
		defaultValues,
		mode: 'onChange',
	});

	const {
		fields: paramsFields,
		append,
		remove,
	} = useFieldArray({
		control: form.control,
		name: 'params',
	});

	const handleParamChange = useCallback(
		(index, newParam) => {
			const isLastParam = index === paramsFields.length - 1;

			// eslint-disable-next-line no-unused-vars
			const { id, ...withoutId } = newParam;
			const isEmpty = isEmptyValues(withoutId);

			if (isLastParam && !isEmpty) {
				append({ key: '', value: '', active: false });
			}

			if (!isLastParam && isEmpty) {
				remove(index);
			}

			form.setValue(`params.${index}`, newParam);
			form.trigger(`params.${index}`);
		},
		[paramsFields, append, remove, form],
	);

	return {
		...form,
		paramsFields,
		append,
		remove,
		handleParamChange,
	};
};

export default useCustomRequestForm;
