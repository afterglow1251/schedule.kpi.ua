import { clamp, range } from 'lodash-es';
import { createContext, useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { ScreenSize } from '../../types/ScreenSize';
import { useCurrentTime } from '../../queries/useCurrentTime';
import { useScreenSize } from '../hooks/useScreenSize';

export type Slice = [number, number];

export interface SliceContext {
  slice: Slice;
  setSlice: (slice: Slice) => void;
}

const SliceOptionsContext = createContext<SliceContext | null>(null);

export const useSliceOptionsContext = (): SliceContext => {
  const context = useContext(SliceOptionsContext);

  if (!context) {
    throw new Error('useSliceOptionsContext must be used within SliceContextProvider');
  }

  return context;
};

const DAYS_COUNT = 6;

const ScreenSizeSlicesCount: Record<ScreenSize, number> = {
  [ScreenSize.Big]: 1,
  [ScreenSize.Medium]: 2,
  [ScreenSize.Small]: 3,
  [ScreenSize.ExtraSmall]: 6,
};

const generateSlices = (screenSize: ScreenSize): Slice[] => {
  const slicesCount = ScreenSizeSlicesCount[screenSize];
  const sliceSize = DAYS_COUNT / slicesCount;

  return range(0, slicesCount).map((index) => [sliceSize * index + 1, sliceSize * (index + 1)]);
};

const getCurrentSlice = (screenSize: ScreenSize, currentDay: number): Slice => {
  const day = clamp(currentDay, 1, DAYS_COUNT);

  return generateSlices(screenSize).find(([start, end]) => day >= start && day <= end) ?? [1, DAYS_COUNT];
};

interface SliceContextProviderProps {
  children: React.ReactNode;
}

export const SliceContextProvider = ({ children }: SliceContextProviderProps) => {
  const { data } = useCurrentTime();
  const { screenSize } = useScreenSize();
  const [slice, setSlice] = useState<Slice>(() => getCurrentSlice(screenSize, dayjs().day()));

  useEffect(() => {
    setSlice(getCurrentSlice(screenSize, data?.currentDay ?? dayjs().day()));
  }, [screenSize, data?.currentDay]);

  return <SliceOptionsContext.Provider value={{ slice, setSlice }}>{children}</SliceOptionsContext.Provider>;
};
