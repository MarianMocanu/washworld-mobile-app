import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query';
import axios from 'src/app/axios';
import { Event } from '@models/Event';

export const QUERY_KEYS = {
  EVENTS: 'events',
};

export const useEvents = (
  userId: number | undefined,
  options: Pick<QueryObserverOptions, 'enabled'>,
  limit: number | undefined,
): UseQueryResult<Event[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.EVENTS, limit],
    queryFn: async function fetchEvents() {
      let url = `/events/user/${userId}`;
      if (limit) {
        url += `?limit=${limit}`;
      }
      const response = await axios.get(url);
      return response.data as Event[];
    },
    enabled: options.enabled ?? true,
  });
};
