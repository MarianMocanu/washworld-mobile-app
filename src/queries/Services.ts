import { Service } from '@models/Service';
import axios, { AxiosError } from 'src/app/axios';
import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query';

export const SERVICES_KEYS = {
  SERVICE_BY_ID: 'service-by-id',
  ALL_SERVICES: 'all-services',
};

export const useService = (
  id?: number,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Service, AxiosError> => {
  return useQuery<Service, AxiosError>({
    queryKey: [SERVICES_KEYS.SERVICE_BY_ID, id],
    queryFn: async function fetchService() {
      const response = await axios.get(`/services/${id}`);
      return response.data as Service;
    },
    enabled: options?.enabled ?? false,
  });
};

export const useServices = (): UseQueryResult<Service[], AxiosError> => {
  return useQuery<Service[], AxiosError>({
    queryKey: [SERVICES_KEYS.ALL_SERVICES],
    queryFn: async function fetchServices() {
      const response = await axios.get('/services');
      return response.data as Service[];
    },
  });
};
