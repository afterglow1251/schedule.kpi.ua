import ScheduleWrapper, { ScheduleGrid } from '../ScheduleWrapper/ScheduleWrapper';
import { useStudentSchedule } from '../../queries/useStudentSchedule';
import { useSelectedEntityId } from '../../common/hooks/useSelectedEntityId';
import StudentScheduleItem from '../ScheduleItem/StudentScheduleItem';
import StudentScheduleItemExtended from '../ScheduleItemExtended/StudentScheduleItemExtended';
import { ENTITY_KEYS } from '../../common/constants/entityKeys';

export const GroupSchedule = () => {
  const groupId = useSelectedEntityId(ENTITY_KEYS.groupId);
  const { data } = useStudentSchedule(groupId);

  return (
    <ScheduleGrid>
      <ScheduleWrapper
        schedule={data}
        baseComponent={StudentScheduleItem}
        baseComponentExtended={StudentScheduleItemExtended}
      />
    </ScheduleGrid>
  );
};
