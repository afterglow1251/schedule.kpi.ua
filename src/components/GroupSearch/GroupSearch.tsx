import SearchSelect from '../SearchSelect';
import { useStore } from '../../store';
import { useEntitySearch } from '../../common/hooks/useEntitySearch';
import { usePreloadedList } from '../../common/hooks/usePreloadedList';
import { ENTITY_KEYS } from '../../common/constants/entityKeys';

const GroupSearch = () => {
  const { groups } = usePreloadedList();
  const group = useStore((state) => state.group);
  const setGroup = useStore((state) => state.setGroup);

  const { handleChange } = useEntitySearch(ENTITY_KEYS.groupId, groups, setGroup);

  return <SearchSelect options={groups} value={group} onChange={handleChange} />;
};

export default GroupSearch;
