import { Terminal, TerminalStatus } from '@models/Terminal';
import {
  QueryObserverOptions,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import axios, { AxiosError } from 'src/app/axios';

export const TERMINAL_QUERY_KEYS = {
  TERMINALS_BY_LOCATION: 'terminals-by-location',
  AVAILABLE_TERMINAL: 'available-terminal',
};

export const useTerminals = (
  locationId: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Terminal[], Error> => {
  return useQuery({
    queryKey: [TERMINAL_QUERY_KEYS.TERMINALS_BY_LOCATION, locationId],
    queryFn: async function fetchTerminalsByLocation() {
      const response = await axios.get<Terminal[]>(`/terminals/location/${locationId}`);
      return response.data as Terminal[];
    },
    enabled: options?.enabled ?? true,
  });
};

export const useAvailableTerminal = (
  locationId: number | undefined,
  serviceId: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Terminal, Error> => {
  return useQuery({
    queryKey: [TERMINAL_QUERY_KEYS.AVAILABLE_TERMINAL, serviceId],
    queryFn: async function fetchAvailableTerminal() {
      const response = await axios.get<Terminal>(`/terminals/available`, {
        params: { locationId, serviceId },
      });
      return response.data as Terminal;
    },
    enabled: options?.enabled ?? true,
  });
};

export const TERMINAL_MUTATION_KEYS = {
  MARK_TERMINAL_AS_BUSY: 'mark-terminal-as-busy',
};

type UpdateTerminalPayload = {
  terminalId: number;
  status: TerminalStatus;
};

export const useBookTerminal = (
  terminalId: number,
): UseMutationResult<Terminal, AxiosError, UpdateTerminalPayload> => {
  const queryClient = useQueryClient();
  return useMutation<Terminal, AxiosError, UpdateTerminalPayload>({
    mutationKey: [TERMINAL_MUTATION_KEYS.MARK_TERMINAL_AS_BUSY, terminalId],
    mutationFn: async function updateTerminal({ terminalId, status }) {
      const response = await axios.patch<Terminal>(`/terminals/${terminalId}`, { status });
      return response.data as Terminal;
    },
    onError: error => {
      console.error('Error updating terminal', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([TERMINAL_QUERY_KEYS.TERMINALS_BY_LOCATION]);
    },
  });
};
