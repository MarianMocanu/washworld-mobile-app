import { UseMutationResult, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'src/app/axios';
import { User } from '@models/User';
import { Car } from '@models/Car';

export const QUERY_KEYS = {
  USER_CARS: 'user-cars',
};

export const MUTATION_KEYS = {
  ADD_CAR: 'add-car',
};

// QUERIES

export const useCars = (userId: number, enabled: boolean): UseQueryResult<Car[], Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_CARS],
    queryFn: async function fetchUserCars() {
      const data = (await axios.get(`/cars/user/${userId}`)).data;
      return data as Car[];
    },
    enabled: enabled,
  });
};

// MUTATIONS

export const useAddCar = (car: Omit<Car, 'id'>): UseMutationResult<number, Error> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_CAR],
    mutationFn: async function addCar() {
      const response = await axios.post(`/cars/`, car);
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.USER_CARS]);
    },
  });
};
