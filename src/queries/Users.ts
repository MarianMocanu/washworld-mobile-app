import { UseQueryResult, useQuery } from 'react-query';
import axios from 'axios';
import { User } from '@models/User';

export const USER_KEYS = {
  ALL_USERS: 'all-users',
  SINGLE_USER: 'single-entry',
};

export const useUsers = (): UseQueryResult<User[], Error> => {
  return useQuery({
    queryKey: [USER_KEYS.ALL_USERS],
    queryFn: async function fetchAllUsers() {
      const data = (await axios.get('/user')).data;
      return data as User[];
    },
  });
};
