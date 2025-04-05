import { useQuery } from '@tanstack/react-query';
import { customRequestsDB } from './db';

const useCustomRequests = () =>
	useQuery({
		queryKey: ['custom-requests'],
		queryFn: () => customRequestsDB.getCustomRequests(),
	});

export default useCustomRequests;
