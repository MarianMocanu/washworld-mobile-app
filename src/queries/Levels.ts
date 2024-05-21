import axios from 'src/app/axios';
import { UseQueryResult, useQuery } from 'react-query';

export const QUERY_KEYS = {
  LEVELS: 'levels',
};

export const fetchLevels = async () => {
  const response = await axios.get(`/levels`);
  return response.data;
};

export const useLevels = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.LEVELS],
    queryFn: fetchLevels,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
