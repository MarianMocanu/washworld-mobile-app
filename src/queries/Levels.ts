import axios from 'src/app/axios';
import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query';

export const QUERY_KEYS = {
  LEVELS: 'levels',
};

export const fetchLevels = async () => {
  const response = await axios.get(`/levels`);
  return response.data;
};

export const useLevels = (options?: Pick<QueryObserverOptions, 'enabled'>): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.LEVELS],
    queryFn: fetchLevels,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    enabled: options?.enabled ?? true,
  });
};
