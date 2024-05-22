import { Subscription } from '@models/Subscription';
import { QueryObserverOptions, UseQueryResult, useMutation, useQuery } from 'react-query';
import axios from 'src/app/axios';

export const SUBSCRIPTION_KEYS = {
  SUBSCRIPTION_USER: 'subscription-for-user',
};

export const MUTATION_KEYS = {
  ADD_SUBSCRIPTION: 'add-subscription',
};

export const useSubscriptions = (
  userId: number | undefined,
  options?: Pick<QueryObserverOptions, 'enabled'>,
): UseQueryResult<Subscription[], Error> => {
  return useQuery({
    queryKey: [SUBSCRIPTION_KEYS.SUBSCRIPTION_USER],
    queryFn: async function fetchSubscriptionForUser() {
      const response = await axios.get<Subscription[]>(`/subscriptions/user/${userId}`);
      return response.data as Subscription[];
    },
    enabled: options?.enabled ?? true,
  });
};

export const useAddSubscription = (levelId?: number, carId?: number) => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_SUBSCRIPTION],
    mutationFn: async function addSubscription() {
      if (levelId && carId) {
        const response = await axios.post<Subscription>(`/subscriptions/`, { levelId, carId });
        return response.data as Subscription;
      }
    },
  });
};
