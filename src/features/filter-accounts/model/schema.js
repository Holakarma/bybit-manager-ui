import * as yup from 'yup';

export const schema = yup.object({
	kyc_levels: yup.array().of(yup.number().nullable()),
	kyc_countries: yup.array().of(yup.string()),
	last_login_countries: yup.array().of(yup.string()),
	kyc_providers: yup.array().of(yup.string()),
	min_balance: yup.number().min(0, 'Must be >= 0'),
	max_balance: yup
		.number()
		.nullable()
		.transform((value) => (isNaN(value) ? null : value))
		.min(0, 'Must be >= 0')
		.moreThan(yup.ref('min_balance'), 'Must be > min'),
	only_with_secure_token: yup.boolean(),
});

export const defaultValues = {
	kyc_levels: [],
	kyc_countries: [],
	last_login_countries: [],
	kyc_providers: [],
	min_balance: 0,
	max_balance: null,
	only_with_secure_token: false,
};

class FilterDTO {
	constructor(filter = defaultValues) {
		this.kyc_levels = this._arrayFilter(filter.kyc_levels);
		this.kyc_countries = this._arrayFilter(filter.kyc_countries);
		this.last_login_countries = this._arrayFilter(
			filter.last_login_countries,
		);
		this.kyc_providers = this._arrayFilter(filter.kyc_providers);
		this.min_balance = filter.min_balance || undefined;
		this.max_balance = filter.max_balance || undefined;
		this.only_with_secure_token =
			filter.only_with_secure_token || undefined;
	}

	_arrayFilter = (filter) => {
		const nullTransform = filter?.map((f) => (f === '' ? null : f));
		return nullTransform?.length ? nullTransform : undefined;
	};
}

export default FilterDTO;
