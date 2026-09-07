import dayjs from 'dayjs';
import { useLastSyncDate } from '../../queries/useLastSyncDate';
import { useSelectedEntityId } from '../../common/hooks/useSelectedEntityId';

export const LastSyncDate = () => {
  const groupId = useSelectedEntityId('groupId');
  const { data, isLoading } = useLastSyncDate(groupId);

  const renderValue = () => {
    if (isLoading) {
      return 'Завантаження...';
    }

    if (!data?.updated) {
      return 'Дата останнього оновлення невідома';
    }

    return (
      <>
        Оновлено <time>{dayjs(data?.updated).format('DD.MM.YYYY')}</time>
      </>
    );
  };

  return (
    <div className="text-xs text-neutral-600">
      <span>{renderValue()}</span>
    </div>
  );
};
