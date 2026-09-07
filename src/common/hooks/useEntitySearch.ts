import { setLocalStorageItem } from '../utils/parsedLocalStorage';
import { useSelectedEntityId } from './useSelectedEntityId';
import { useEffect } from 'react';

import { EntityWithNameAndId } from '../../models/EntityWithNameAndId';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { EntityKey } from '../constants/entityKeys';

export const useEntitySearch = <T extends EntityWithNameAndId>(
  storageKey: EntityKey,
  items: T[],
  setValue: (value?: T) => void,
) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const itemId = useSelectedEntityId(storageKey);

  useEffect(() => {
    if (!itemId) {
      return;
    }
    setSearchParams({ [storageKey]: itemId }, { replace: true });
  }, [storageKey, itemId]);

  useEffect(() => {
    if (!itemId) {
      return;
    }
    const group = items.find(({ id }) => String(id) === itemId);
    setValue(group);
  }, [items, itemId]);

  const handleChange = (item: T) => {
    setValue(item);

    navigate(`?${storageKey}=${item.id}`, { replace: true });

    setLocalStorageItem(storageKey, item.id);
  };

  return { handleChange };
};
