import { useEffect, useState } from 'react';
import { useIsFetching, useQueryClient } from 'react-query';

const READY_TIMEOUT_MS = 3000;

export const useInitialDataReady = () => {
  const queryClient = useQueryClient();
  const fetchingCount = useIsFetching();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // live count: the hook state is still 0 on the first commit while child fetches already run
    if (!isReady && queryClient.isFetching() === 0) {
      setIsReady(true);
    }
  }, [fetchingCount, isReady, queryClient]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), READY_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  return isReady;
};
