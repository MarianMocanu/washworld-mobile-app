import { Step } from '@models/Step';
import { UseQueryResult, useQuery } from 'react-query';
import axios from 'src/app/axios';

export const STEP_KEYS = {
  ALL_STEPS: 'all-steps',
};

export const useSteps = (): UseQueryResult<Step[], Error> => {
  return useQuery({
    queryKey: [STEP_KEYS.ALL_STEPS],
    queryFn: async function fetchSteps() {
      const response = await axios.get<Step[]>('/steps');
      return response.data as Step[];
    },
  });
};
