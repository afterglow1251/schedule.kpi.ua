import { useSearchParams } from 'react-router-dom';
import { getLocalStorageItem } from '../utils/parsedLocalStorage';
import { EntityKey } from '../constants/entityKeys';

export const useSelectedEntityId = (storageKey: EntityKey): string | undefined => {
  const [searchParams] = useSearchParams();
  const storedId = getLocalStorageItem<string | number>(storageKey);

  return searchParams.get(storageKey) || (storedId === undefined ? undefined : String(storedId));
};
