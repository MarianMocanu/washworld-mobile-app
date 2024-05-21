import { Terminal } from '@models/Terminal';
import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query';
import axios from 'src/app/axios';

export const TERMINAL_KEYS = {
  TERMINALS_BY_LOCATION: 'terminals-by-location',
  AVAILABLE_TERMINAL: 'available-terminal',
};

export const useTerminals = (
  locationId: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Terminal[], Error> => {
  return useQuery({
    queryKey: [TERMINAL_KEYS.TERMINALS_BY_LOCATION, locationId],
    queryFn: async function fetchTerminalsByLocation() {
      const response = await axios.get<Terminal[]>(`/terminals/location/${locationId}`);
      return response.data as Terminal[];
    },
    enabled: options?.enabled ?? true,
  });
};

export const useAvailableTerminal = (
  serviceId: number,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Terminal, Error> => {
  return useQuery({
    queryKey: [TERMINAL_KEYS.AVAILABLE_TERMINAL, serviceId],
    queryFn: async function fetchAvailableTerminal() {
      const response = await axios.get<Terminal>(`/terminals/available/${serviceId}`);
      return response.data as Terminal;
    },
  });
};
