import ScheduleWrapper, { ScheduleGrid } from '../ScheduleWrapper/ScheduleWrapper';
import { useLecturerSchedule } from '../../queries/useLecturerSchedule';
import { useSelectedEntityId } from '../../common/hooks/useSelectedEntityId';
import LecturerScheduleItem from '../ScheduleItem/LecturerScheduleItem';
import LecturerScheduleItemExtended from '../ScheduleItemExtended/LecturerScheduleItemExtended';
import { ENTITY_KEYS } from '../../common/constants/entityKeys';

export const LecturerSchedule = () => {
  const lecturerId = useSelectedEntityId(ENTITY_KEYS.lecturerId);
  const { data } = useLecturerSchedule(lecturerId);

  return (
    <ScheduleGrid>
      <ScheduleWrapper
        schedule={data}
        baseComponent={LecturerScheduleItem}
        baseComponentExtended={LecturerScheduleItemExtended}
      />
    </ScheduleGrid>
  );
};
