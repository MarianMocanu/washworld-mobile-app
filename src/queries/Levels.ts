import axios from 'src/app/axios';
import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query';
import { Level } from '@models/Level';

export const QUERY_KEYS = {
  LEVELS: 'levels',
};

export const useLevels = (options?: Pick<QueryObserverOptions, 'enabled'>): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.LEVELS],
    queryFn: async function fetchLevels() {
      const response = await axios.get<Level[]>(`/levels`);
      return response.data as Level[];
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    enabled: options?.enabled ?? true,
  });
};
