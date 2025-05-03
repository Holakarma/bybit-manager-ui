import { useCallback, useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { uniqueId } from 'shared/lib/generateUniqueId';
import { isEmptyValues } from 'shared/lib/isEmptyValues';

export const defaultParam = () => ({
	key: '',
	value: '',
	active: true,
	id: uniqueId(),
});

const useCustomRequestForm = (defaultValues) => {
	const form = useForm({
		defaultValues,
		mode: 'onChange',
	});

	const {
		fields: paramsFields,
		append: appendParam,
		remove: removeParam,
		replace: replaceParam,
	} = useFieldArray({
		control: form.control,
		name: 'params',
	});

	const {
		fields: headersFields,
		append: appendHeader,
		remove: removeHeader,
		replace: replaceHeader,
	} = useFieldArray({
		control: form.control,
		name: 'headers',
	});

	const {
		fields: cookiesFields,
		append: appendCookie,
		remove: removeCookie,
		replace: replaceCookie,
	} = useFieldArray({
		control: form.control,
		name: 'cookies',
	});

	const fieldsController = useMemo(
		() => ({
			append: {
				params: appendParam,
				headers: appendHeader,
				cookies: appendCookie,
			},
			remove: {
				params: removeParam,
				headers: removeHeader,
				cookies: removeCookie,
			},
			replace: {
				params: replaceParam,
				headers: replaceHeader,
				cookies: replaceCookie,
			},
		}),
		[
			appendParam,
			appendHeader,
			removeParam,
			removeHeader,
			replaceParam,
			replaceHeader,
			appendCookie,
			removeCookie,
			replaceCookie,
		],
	);

	const watchedParams = useWatch({ control: form.control, name: 'params' });
	const watchedHeaders = useWatch({ control: form.control, name: 'headers' });
	const watchedCookies = useWatch({ control: form.control, name: 'cookies' });

	const fieldArrays = useMemo(
		() => ({
			params: watchedParams || paramsFields,
			headers: watchedHeaders || headersFields,
			cookies: watchedCookies || cookiesFields,
		}),
		[
			watchedParams,
			watchedHeaders,
			watchedCookies,
			paramsFields,
			headersFields,
			cookiesFields,
		],
	);

	const handleArrayFieldsChange = useCallback(
		(index, newField, name) => {
			const isLastParam = index === fieldArrays[name].length - 1;

			// eslint-disable-next-line no-unused-vars
			const { active, ...withoutActive } = newField;
			const isEmpty = isEmptyValues(withoutActive);

			if (isLastParam && !isEmpty) {
				fieldsController.append[name](defaultParam());
			}

			if (!isLastParam && isEmpty) {
				fieldsController.remove[name](index);
				return;
			}

			form.setValue(`${name}.${index}`, newField, { shouldDirty: true });
			form.trigger(`${name}.${index}`);
		},
		[fieldArrays, fieldsController, form],
	);

	return {
		...form,
		fieldArrays,
		fieldsController,
		handleArrayFieldsChange,
	};
};

export default useCustomRequestForm;
