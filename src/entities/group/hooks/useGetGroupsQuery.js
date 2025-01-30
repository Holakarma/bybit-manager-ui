import { useQuery } from '@tanstack/react-query';
import getGroups from '../api/getGroups';

const useGetGroupsQuery = () =>
	useQuery({
		queryKey: ['groups'],
		queryFn: getGroups,
		retry: false,
	});

export default useGetGroupsQuery;
