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

	const onSubmit = async (data) => {
		const newRequest = new CustomRequestDTO({
			...data,
			params: data.params.filter((p) => p.key),
			headers: data.headers.filter((p) => p.key),
			cookies: data.cookies.filter((p) => p.key),
		});

		const isRequestExist = customRequests.includes(customRequest);
		if (customRequest && isRequestExist) {
			await updateMutation.mutateAsync({
				id: newRequest.id,
				newCustomRequestData: newRequest,
			});
		} else {
			await addMutation.mutateAsync(newRequest);
		}
		setRequest(newRequest);
	};

	return {
		onSubmit,
		isLoading: addMutation.isPending || updateMutation.isPending,
	};
};

export default RequestFormContainer;
