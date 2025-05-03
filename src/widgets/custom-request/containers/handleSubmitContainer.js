import {
	CustomRequestDTO,
	useAddCustomRequest,
	useSelectedRequest,
	useUpdateCustomRequest,
} from 'entities/custom-request';

const RequestFormContainer = () => {
	const addMutation = useAddCustomRequest();
	const updateMutation = useUpdateCustomRequest();
	const customRequest = useSelectedRequest.use.request();
	const setRequest = useSelectedRequest.use.setRequest();

	const onSubmit = (data) => {
		const newRequest = new CustomRequestDTO({
			...data,
			params: data.params.filter((p) => p.key && p.value),
			headers: data.headers.filter((p) => p.key && p.value),
			cookies: data.cookies.filter((p) => p.key && p.value),
		});

		if (customRequest) {
			updateMutation.mutate({
				id: newRequest.id,
				newCustomRequestData: newRequest,
			});
		} else {
			addMutation.mutate(newRequest);
		}
		setRequest(newRequest);
	};

	return {
		onSubmit,
		isLoading: addMutation.isPending || updateMutation.isPending,
	};
};

export default RequestFormContainer;
