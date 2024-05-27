import { Subscription } from '@models/Subscription';
import { QueryObserverOptions, UseQueryResult, useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'src/app/axios';
import { CAR_QUERY_KEYS } from './Car';

export const SUBSCRIPTION_KEYS = {
  USER_SUBSCRIPTIONS: 'subscription-for-user',
  CAR_SUBSCRIPTIONS: 'subscription-for-car',
};

export const MUTATION_KEYS = {
  ADD_SUBSCRIPTION: 'add-subscription',
  UPDATE_SUBSCRIPTION: 'update-subscription',
};

export const useSubscriptions = (
  userId: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Subscription[], Error> => {
  return useQuery({
    queryKey: [SUBSCRIPTION_KEYS.USER_SUBSCRIPTIONS, userId],
    queryFn: async function fetchSubscriptionForUser() {
      const response = await axios.get<Subscription[]>(`/subscriptions/user/${userId}`);
      return response.data as Subscription[];
    },
    enabled: options?.enabled ?? true,
  });
};

export const useCarSubscriptions = (
  carId: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Subscription[], Error> => {
  return useQuery({
    queryKey: [SUBSCRIPTION_KEYS.CAR_SUBSCRIPTIONS, carId],
    queryFn: async function fetchSubscriptionForCar() {
      const response = await axios.get<Subscription[]>(`/subscriptions/car/${carId}`);
      return response.data as Subscription[];
    },
    enabled: options?.enabled ?? true,
  });
};

export const useAddSubscription = (levelId?: number, carId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_SUBSCRIPTION],
    mutationFn: async function addSubscription() {
      if (levelId && carId) {
        const response = await axios.post<Subscription>(`/subscriptions/`, { levelId, carId });
        return response.data as Subscription;
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([SUBSCRIPTION_KEYS.USER_SUBSCRIPTIONS]);
      queryClient.invalidateQueries([CAR_QUERY_KEYS.USER_CARS]);
    },
  });
};

export const useUpdateSubscription = (subscriptionId?: number, levelId?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_SUBSCRIPTION],
    mutationFn: async function updateSubscription() {
      if (subscriptionId && levelId) {
        const response = await axios.patch<Subscription>(`/subscriptions/${subscriptionId}`, { levelId });
        return response.data as Subscription;
      }
    },
    onError: error => {
      console.error('Error updating subscription', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([SUBSCRIPTION_KEYS.USER_SUBSCRIPTIONS]);
      queryClient.invalidateQueries([SUBSCRIPTION_KEYS.CAR_SUBSCRIPTIONS]);
      queryClient.invalidateQueries([CAR_QUERY_KEYS.USER_CARS]);
    },
  });
};
