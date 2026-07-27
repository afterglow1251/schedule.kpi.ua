import { entries, map, sortBy } from 'lodash-es';
import { getTimeSlots } from '../api/time';
import { useQuery } from 'react-query';

export const getQueryKey = () => {
  return 'timeSlots';
};

const DEFAULT_TIME_SLOTS = ['08:30:00', '10:25:00', '12:20:00', '14:15:00', '16:10:00', '18:05:00', '20:00:00'];

export const useTimeSlots = () => {
  return useQuery({
    staleTime: 12 * 60 * 60 * 1000,
    queryKey: getQueryKey(),
    placeholderData: DEFAULT_TIME_SLOTS,
    queryFn: async () => {
      const timeSlots = await getTimeSlots();

      return map(
        sortBy(entries(timeSlots), ([key]) => parseInt(key, 10)),
        ([, timeSlot]) => timeSlot,
      );
    },
    refetchOnWindowFocus: false,
  });
};
