import { useSearchParams } from 'react-router-dom';
import { getLocalStorageItem } from '../utils/parsedLocalStorage';

export const useSelectedEntityId = (storageKey: string): string | undefined => {
  const [searchParams] = useSearchParams();
  const storedId = getLocalStorageItem<string | number>(storageKey);

  return searchParams.get(storageKey) || (storedId === undefined ? undefined : String(storedId));
};
