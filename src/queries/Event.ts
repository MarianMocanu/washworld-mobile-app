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
  EVENT_COUNT_FOR_USER: 'eventCountForUser',
  RECENT_EVENTS: 'recent-events',
};

export const EVENT_MUTATION_KEYS = {
  CREATE_EVENT: 'create-event',
};

export const useEvents = (
  userId: number | undefined,
  options: Pick<QueryObserverOptions, 'enabled'>,
  limit?: number,
): UseQueryResult<Event[], Error> => {
  return useQuery({
    queryKey: [limit ? EVENT_QUERY_KEYS.RECENT_EVENTS : EVENT_QUERY_KEYS.EVENTS, userId],
    queryFn: async function fetchEvents() {
      let url = `/events/user/${userId}`;
      const response = await axios.get(url, { params: { limit } });
      return response.data as Event[];
    },
    enabled: options.enabled ?? true,
  });
};

export const useEventsNumber = (
  userId: number | undefined,
  options: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<number, Error> => {
  return useQuery({
    queryKey: [EVENT_QUERY_KEYS.EVENT_COUNT_FOR_USER],
    queryFn: async function fetchEventsNumber() {
      const response = await axios.get(`/events/user/${userId}/count`);
      return response.data as number;
    },
    enabled: options.enabled ?? true,
  });
};

type CreateEventPayload = {
  carId?: number;
  serviceId?: number;
  terminalId?: number;
};

export const useCreateEvent = (userId: number): UseMutationResult<Event, AxiosError, CreateEventPayload> => {
  const queryClient = useQueryClient();
  return useMutation<Event, AxiosError, CreateEventPayload>({
    mutationKey: [EVENT_MUTATION_KEYS.CREATE_EVENT, userId],
    mutationFn: async function createEvent(payload: CreateEventPayload) {
      const response = await axios.post<Event>(`/events`, payload);
      return response.data as Event;
    },
    onError: error => {
      console.error('Error creating event', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries([EVENT_QUERY_KEYS.EVENTS, userId]);
      queryClient.invalidateQueries([EVENT_QUERY_KEYS.RECENT_EVENTS, userId]);
      queryClient.invalidateQueries([EVENT_QUERY_KEYS.EVENT_COUNT_FOR_USER]);
    },
  });
};
