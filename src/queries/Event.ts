import {
  QueryObserverOptions,
  UseQueryResult,
  useQuery,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from 'react-query';
import { Event } from '@models/Event';
import axios, { AxiosError } from 'src/app/axios';

export const EVENT_QUERY_KEYS = {
  EVENTS: 'events',
};

export const EVENT_MUTATION_KEYS = {
  CREATE_EVENT: 'create-event',
};

export const useEvents = (
  userId: number | undefined,
  options: Pick<QueryObserverOptions, 'enabled'>,
  limit: number | undefined,
): UseQueryResult<Event[], Error> => {
  return useQuery({
    queryKey: [EVENT_QUERY_KEYS.EVENTS],
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

type CreateEventPayload = {
  carId?: number;
  serviceId?: number;
  terminalId?: number;
};

export const useCreateEvent = (): UseMutationResult<Event, AxiosError, CreateEventPayload> => {
  const queryClient = useQueryClient();
  return useMutation<Event, AxiosError, CreateEventPayload>({
    mutationKey: [EVENT_MUTATION_KEYS.CREATE_EVENT],
    mutationFn: async function createEvent(payload: CreateEventPayload) {
      const response = await axios.post<Event>(`/events`, payload);
      return response.data as Event;
    },
    onError: error => {
      console.error('Error creating event', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([EVENT_QUERY_KEYS.EVENTS]);
    },
  });
};
