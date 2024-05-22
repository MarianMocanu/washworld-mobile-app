import { QueryObserverOptions, UseQueryResult, useQuery } from 'react-query';
import { Location } from '@models/Location';
import axios from 'src/app/axios';

export const LOCATION_KEYS = {
  ALL_LOCATIONS: 'all-locations',
};

export const useLocations = (
  longitude?: number | undefined,
  latitude?: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Location[], Error> => {
  return useQuery({
    queryKey: [LOCATION_KEYS.ALL_LOCATIONS, latitude, longitude],
    queryFn: async function fetchAllLocations() {
      const params: { latitude?: number; longitude?: number } = {};
      if (latitude) {
        params.latitude = latitude;
      }
      if (longitude) {
        params.longitude = longitude;
      }
      const { data } = await axios.get<Location[]>('/locations', { params });
      return data as Location[];
    },
    enabled: options?.enabled ?? true,
  });
};
