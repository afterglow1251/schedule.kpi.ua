import ScheduleWrapper, { ScheduleGrid } from '../ScheduleWrapper/ScheduleWrapper';
import { useStudentSchedule } from '../../queries/useStudentSchedule';
import { useSelectedEntityId } from '../../common/hooks/useSelectedEntityId';
import StudentScheduleItem from '../ScheduleItem/StudentScheduleItem';
import StudentScheduleItemExtended from '../ScheduleItemExtended/StudentScheduleItemExtended';

export const GroupSchedule = () => {
  const groupId = useSelectedEntityId('groupId');
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
