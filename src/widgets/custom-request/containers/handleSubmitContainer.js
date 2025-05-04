import {
	CustomRequestDTO,
	useAddCustomRequest,
	useCustomRequests,
	useSelectedRequest,
	useUpdateCustomRequest,
} from 'entities/custom-request';

const RequestFormContainer = () => {
	const addMutation = useAddCustomRequest();
	const updateMutation = useUpdateCustomRequest();
	const customRequest = useSelectedRequest.use.request();
	const setRequest = useSelectedRequest.use.setRequest();

	const { data: customRequests } = useCustomRequests();

	const onSubmit = (data) => {
		const newRequest = new CustomRequestDTO({
			...data,
			params: data.params.filter((p) => p.key),
			headers: data.headers.filter((p) => p.key),
			cookies: data.cookies.filter((p) => p.key),
		});

		const isRequestExist = customRequests.includes(customRequest);
		if (customRequest && isRequestExist) {
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
