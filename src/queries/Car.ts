import {
  QueryObserverOptions,
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import axios, { AxiosError } from 'src/app/axios';
import { Car } from '@models/Car';

export const CAR_QUERY_KEYS = {
  USER_CARS: 'user-cars',
  CAR_BY_ID: 'car-by-id',
};

export const MUTATION_KEYS = {
  ADD_CAR: 'add-car',
};

// QUERIES

export const useCars = (
  userId: number | undefined,
  options: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Car[], Error> => {
  return useQuery({
    queryKey: [CAR_QUERY_KEYS.USER_CARS],
    queryFn: async function fetchUserCars() {
      const data = (await axios.get(`/cars/user/${userId}`)).data;
      return data as Car[];
    },
    enabled: options.enabled ?? true,
  });
};

export const useCar = (
  carId: number | undefined,
  options: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Car, AxiosError> => {
  return useQuery({
    queryKey: [CAR_QUERY_KEYS.CAR_BY_ID, carId],
    queryFn: async function fetchCar() {
      const data = (await axios.get<Car>(`/cars/${carId}`)).data;
      return data as Car;
    },
    enabled: options.enabled ?? true,
  });
};

// MUTATIONS

export const useAddCar = (car: Partial<Car>, id?: number): UseMutationResult<Car, Error> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_CAR],
    mutationFn: async function addCar() {
      const response = await axios.post<Car>(`/cars`, { ...car, userId: id });
      return response.data as Car;
    },
    onSuccess() {
      queryClient.invalidateQueries([CAR_QUERY_KEYS.USER_CARS]);
    },
  });
};
